import type { Task } from '../types/task'

import TaskList from './TaskList'

type TaskListStateProps = {
    tasks: Task[]
    isLoading: boolean
    error: string | null
}

function TaskListState({ tasks, isLoading, error }: TaskListStateProps) {
    if (isLoading) {
        return <p>Loading tasks...</p>
    }

    if (error !== null) {
        return <p>{error}</p>
    }

    if (tasks.length === 0) {
        return <p>No tasks yet</p>
    }

    return <TaskList tasks={tasks} />
}

export default TaskListState