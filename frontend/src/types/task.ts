export type TaskStatus =
    | 'planned'
    | 'in_progress'
    | 'done'
    | 'undone'
    | 'cancelled'

export type TaskStatusFilterValue = TaskStatus | 'all'

export type Task = {
    id: number
    title: string
    description: string | null
    date: string
    start_time: string | null
    estimated_minutes: number | null
    status: TaskStatus
    user_id: number
}

export type TaskCreate = Omit<Task, 'id'>