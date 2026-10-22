import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { createTask } from '../api/tasks'
import type { Task, TaskCreate } from '../types/task'

type TaskCreateFormProps = {
    date: string
    onDateChange: (date: string) => void
    onCreated: (task: Task) => void
}

function TaskCreateForm({
    date,
    onDateChange,
    onCreated,
}: TaskCreateFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [estimatedMinutes, setEstimatedMinutes] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] =
        useState<string | null>(null)
    
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

            setIsSubmitting(true)
            setSubmitError(null)
            setSuccessMessage(null)

            const taskData: TaskCreate = {
                title: trimmedTitle,
                description: trimmedDescription === ''
                    ? null
                    : trimmedDescription,
                date,
                start_time: startTime === ''
                    ? null
                    : startTime,
                estimated_minutes: parsedMinutes,
                status: 'planned',
                user_id: 1,
            }

            try {
                const createdTask = await createTask(taskData)
                setTitle('')
                setDescription('')
                setStartTime('')
                setEstimatedMinutes('')
                setSuccessMessage('Task created')
                onCreated(createdTask)
            } catch {
                setSubmitError('Failed to create task. Please try again')
            } finally {
                setIsSubmitting(false)
            }
        }

    return (
        <form
            className="task-create-form"
            onSubmit={handleSubmit}
            aria-labelledby="task-create-heading"
            aria-busy={isSubmitting}
        >
            <h2 id="task-create-heading">New Task</h2>
            <fieldset disabled={isSubmitting}>
                <label htmlFor="new-task-title">Title</label>
                <input
                    id="new-task-title"
                    type="text"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.currentTarget.value)
                        setSubmitError(null)
                        setSuccessMessage(null)
                    }}
                    required
                />
                <label htmlFor="new-task-date">Date</label>
                <input
                    id="new-task-date"
                    type="date"
                    value={date}
                    onChange={(event) => {
                        const nextDate = event.currentTarget.value
                        if (nextDate !== '') onDateChange(nextDate)
                    }}
                    required
                />
                <label htmlFor="new-task-description">Description</label>
                <textarea
                    id="new-task-description"
                    rows={4}
                    value={description}
                    onChange={(event) => {
                        setDescription(event.currentTarget.value)
                        setSubmitError(null)
                        setSuccessMessage(null)
                    }}
                />
                <label htmlFor="new-task-start-time">Start time</label>
                <input
                   id="new-task-start-time"
                   type="time"
                   value={startTime}
                   onChange={(event) => {
                    setStartTime(event.currentTarget.value)
                    setSubmitError(null)
                    setSuccessMessage(null)
                   }}
                />
                <label htmlFor="new-task-estimated-minutes">Estimated minutes</label>
                <input
                   id="new-task-estimated-minutes"
                   type="number"
                   min={1}
                   step={1}
                   value={estimatedMinutes}
                   onChange={(event) => {
                    setEstimatedMinutes(event.currentTarget.value)
                    setSubmitError(null)
                    setSuccessMessage(null)
                   }}
                />
                <button type="submit">
                    {isSubmitting ? 'Creating...' : 'Create task'}
                </button>
            </fieldset>
            {submitError !== null && (
                <p className="task-create-message task-create-error" role="alert">
                    {submitError}
                </p>
            )}
            {successMessage !== null && (
                <p className="task-create-message task-create-success" role="status">
                    {successMessage}
                </p>
            )}
        </form>
    )
}

export default TaskCreateForm