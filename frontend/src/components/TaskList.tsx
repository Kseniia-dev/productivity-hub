import type { Task } from '../types/task'

import TaskItem from './TaskItem'


type TaskListProps = {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    )
}

export default TaskList