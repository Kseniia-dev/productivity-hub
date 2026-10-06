import type { Task } from '../types/task'

type TaskItemProps = {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
    return <li>{task.title}</li>
}

export default TaskItem