import type { Task } from '../types/task'

import TaskItem from './TaskItem'


type TaskListProps = {
  tasks: Task[]
  onTaskUpdated: () => void
}

function TaskList({ tasks, onTaskUpdated }: TaskListProps) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} />
            ))}
        </ul>
    )
}

export default TaskList