import type { Task } from '../types/task'

import TaskList from './TaskList'

type TaskListStateProps = {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    onRetry: () => void
}

function TaskListState({ 
    tasks, 
    isLoading, 
    error, 
    onRetry, 
}: TaskListStateProps) {
    if (isLoading) {
        return <p className="task-state">Loading tasks...</p>
    }

    if (error !== null) {
        return (
            <div className="task-state task-state-error">
                <p>{error}</p>
                <button
                    type="button"
                    className="task-retry"
                    onClick={onRetry}
                >
                    Try again
                </button>
            </div>
        )
    }
               
    if (tasks.length === 0) {
        return <p className="task-state">No tasks yet</p>
    }

    return <TaskList tasks={tasks} />
}

export default TaskListState