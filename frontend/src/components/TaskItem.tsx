import type { Task } from '../types/task'

type TaskItemProps = {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
    return (
        <li className="task-card">
            <h2 className="task-title">{task.title}</h2>
            <p className="task-meta">Status: {task.status}</p>
            <p className="task-meta">Date: {task.date}</p>

            {task.description !== null && (
                <p className="task-description">{task.description}</p>
            )}
            {task.start_time !== null && (
                <p className="task-meta">Start: {task.start_time}</p>
            )}
            {task.estimated_minutes !== null && (
                <p className="task-meta">Estimate: {task.estimated_minutes} min</p>
            )}
        </li>
    )
}

export default TaskItem