import type { TaskStatusFilterValue } from '../types/task'

type TaskStatusFilterProps = {
    value: TaskStatusFilterValue
    onChange: (value: TaskStatusFilterValue) => void
}

function TaskStatusFilter({ value, onChange }: TaskStatusFilterProps) {
    return (
        <div className="task-filter">
            <label htmlFor="task-status-filter">Status</label>
                <select
                    id="task-status-filter"
                    value={value}
                    onChange={(event) => {
                        onChange(event.currentTarget.value as TaskStatusFilterValue)
                    }}
                >
                    <option value="all">All statuses</option>
                    <option value="planned">Planned</option>
                    <option value="in_progress">In progress</option>
                    <option value="done">Done</option>
                    <option value="undone">Undone</option>
                    <option value="cancelled">Cancelled</option>            
                </select>
        </div>
    )
}

export default TaskStatusFilter       