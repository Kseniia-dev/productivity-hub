import type { Task } from '../types/task'

type TaskItemProps = {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
    return (
        <li>
            <h2>{task.title}</h2>
            <p>{task.status}</p>
            <p>Date: {task.date}</p>

            {task.description !== null && (
                <p>{task.description}</p>
            )}
            {task.start_time !== null && (
                <p>Start: {task.start_time}</p>
            )}
            {task.estimated_minutes !== null && (
                <p>Estimate: {task.estimated_minutes} min</p>
            )}
        </li>
    )
}

export default TaskItem