import type { TaskStatus } from '../types/task'

type TaskStatusBadgeProps = {
    status: TaskStatus
}

function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
    const statusClassName = 'task-status task-status-' + status
    const statusLabel = status.replace('_', ' ')
    return (
        <span className={statusClassName}>
            {statusLabel}
        </span>
    )
}

export default TaskStatusBadge