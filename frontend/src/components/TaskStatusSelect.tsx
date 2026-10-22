import { useState } from 'react'
import type { TaskStatus } from '../types/task'
import { updateTaskStatus } from '../api/tasks'

type TaskStatusSelectProps = {
    taskId: number
    status: TaskStatus
    onUpdated: () => void
}

function TaskStatusSelect({ taskId, status, onUpdated }: TaskStatusSelectProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [saveError, setSaveError] = useState<string | null>(null)
    const selectId = 'task-stats-' + taskId

    async function handleStatusChange(nextStatus: TaskStatus) {
        if (isSaving || nextStatus === status) return

        setIsSaving(true)
        setSaveError(null)

        try {
            await updateTaskStatus(taskId, nextStatus)
            onUpdated()
        } catch {
            setSaveError('Failed to update status. Please try again')
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div 
        className="task-status-control"
        aria-busy={isSaving}
        >
            <label htmlFor={selectId}>Change status</label>
                <select
                    id={selectId}
                    value={status}
                    disabled={isSaving}
                    onChange={(event) => {
                        const nextStatus = event.currentTarget.value as TaskStatus
                        void handleStatusChange(nextStatus)
                    }}
                >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                    <option value="undone">Undone</option>
                    <option value="cancelled">Cancelled</option>            
                </select>

                {isSaving && (
                    <p className="task-status-message" role="status">
                        Saving...
                    </p>
                )}
                {saveError !== null && (
                    <p className="task-status-message task-status-error" role="alert">
                        {saveError}
                    </p>
                )}
        </div>
    )
}

export default TaskStatusSelect
