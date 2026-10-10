import type { Task } from '../types/task'

import TaskList from './TaskList'

type TaskListStateProps = {
    tasks: Task[]
    isLoading: boolean
    error: string | null
}

function TaskListState({ tasks, isLoading, error }: TaskListStateProps) {
    if (isLoading) {
        return <p className="task-state">Loading tasks...</p>
    }

    if (error !== null) {
        return <p className="task-state task-state-error">{error}</p>
    }

    if (tasks.length === 0) {
        return <p className="task-state">No tasks yet</p>
    }

    return <TaskList tasks={tasks} />
}

export default TaskListState