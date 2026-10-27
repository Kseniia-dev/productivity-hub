import { useState } from "react"
import { deleteTask } from "../api/tasks"


type TaskDeleteButtonProps = {
    taskId: number
    taskTitle: string
    onDeleted: () => void
}

function TaskDeleteButton({ taskId, taskTitle, onDeleted }: TaskDeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState<string | null>(null)

    async function handleDelete() {
        if (isDeleting) return
        const confirmed = window.confirm(
            'Delete "' + taskTitle + '"? This cannot be undone',
        )
        if (!confirmed) return

        setIsDeleting(true)
        setDeleteError(null)
        
        try {
            await deleteTask(taskId)
            onDeleted()
        } catch {
            setDeleteError('Failed to delete task. Please try again')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div
            className="task-delete-control"
            aria-busy={isDeleting}
        >
            <button
                type="button"
                className="task-delete-button"
                disabled={isDeleting}
                onClick={() => {
                    void handleDelete()
                }}
            >
                {isDeleting ? 'Deleting...' : 'Delete task'}
            </button>

            {deleteError !== null && (
                <p className="task-delete-message task-delete-error" role="alert">
                    {deleteError}
                </p>
            )}
        </div>
    )
}

export default TaskDeleteButton