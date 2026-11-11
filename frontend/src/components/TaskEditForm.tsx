import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { updateTask } from '../api/tasks'
import type { Task, TaskUpdate } from '../types/task'
import { formatTaskTime } from '../utils/formatTask'


type TaskEditFormProps = {
    task: Task
    onCancel: () => void
    onSaved: () => void
}

function TaskEditForm({
    task,
    onCancel,
    onSaved,
}: TaskEditFormProps) {
    const [title, setTitle] = useState(task.title)
    const initialDescription = task.description ?? ''
    const [description, setDescription] = useState(initialDescription)
    const initialStartTime = task.start_time === null
        ? ''
        : formatTaskTime(task.start_time)

    const [startTime, setStartTime] = useState(initialStartTime)
    
    const initialMinutes = task.estimated_minutes === null
        ? ''
        : String(task.estimated_minutes)

    const [estimatedMinutes, setEstimatedMinutes] = useState(initialMinutes)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const fieldPrefix = 'edit-task-' + task.id

        async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
            event.preventDefault()

            if (isSubmitting) return

            const trimmedTitle = title.trim()
            if (trimmedTitle === '') {
                setSubmitError('Enter a task title')
                return
            }
            
            const minutesText = estimatedMinutes.trim()
            const parsedMinutes = minutesText === '' ? null : Number(minutesText)

            if (
                parsedMinutes !== null &&
                (!Number.isSafeInteger(parsedMinutes) || parsedMinutes <= 0)
            ) {
                setSubmitError('Enter a positive whole number of minutes')
                return
            }
            
            const trimmedDescription = description.trim()

            const taskData: TaskUpdate = {}

            if (title !== task.title) {
                taskData.title = trimmedTitle
            }

            if (description !== initialDescription) {
                taskData.description = trimmedDescription === ''
                    ? null
                    : trimmedDescription
            }

            if (startTime !== initialStartTime) {
                taskData.start_time = startTime === 
                '' ? null 
                : startTime
            }

            if (estimatedMinutes !== initialMinutes) {
                taskData.estimated_minutes = parsedMinutes
            }

            if (Object.keys(taskData).length === 0) {
                onCancel()
                return
            }

            setIsSubmitting(true)
            setSubmitError(null)


            try {
                await updateTask(task.id, taskData)
                onSaved()
            } catch {
                setSubmitError('Failed to save changes. Please try again')
            } finally {
                setIsSubmitting(false)
            }
        }

    return (
        <form
            className="task-edit-form"
            onSubmit={handleSubmit}
            aria-label="Edit task"
            aria-busy={isSubmitting}
        >
            <fieldset disabled={isSubmitting}>
                <label htmlFor={fieldPrefix + '-title'}>Title</label>
                <input
                    id={fieldPrefix + '-title'}
                    type="text"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value)
                        setSubmitError(null)
                    }}
                    required
                />
                <label htmlFor={fieldPrefix + '-description'}>Description</label>
                <textarea
                    id={fieldPrefix + '-description'}
                    rows={4}
                    value={description}
                    onChange={(event) => {
                        setDescription(event.currentTarget.value)
                        setSubmitError(null)
                    }}
                />
                <label htmlFor={fieldPrefix + '-start-time'}>Start time</label>
                <input
                   id={fieldPrefix + '-start-time'}
                   type="time"
                   value={startTime}
                   onChange={(event) => {
                    setStartTime(event.currentTarget.value)
                    setSubmitError(null)
                   }}
                />
                <label htmlFor={fieldPrefix + '-estimated-minutes'}>Estimated minutes</label>
                <input
                   id={fieldPrefix + '-estimated-minutes'}
                   type="number"
                   min={1}
                   step={1}
                   value={estimatedMinutes}
                   onChange={(event) => {
                    setEstimatedMinutes(event.currentTarget.value)
                    setSubmitError(null)
                   }}
                />
                <div className="task-edit-actions">
                    <button type="submit">
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </fieldset>
            {submitError !== null && (
                <p className="task-create-message task-create-error" role="alert">
                    {submitError}
                </p>
            )}
        </form>
    )
}

export default TaskEditForm