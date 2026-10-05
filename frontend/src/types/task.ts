export type TaskStatus =
    | 'planned'
    | 'in_progress'
    | 'done'
    | 'undone'
    | 'cancelled'


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