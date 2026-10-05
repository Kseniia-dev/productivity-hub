import type { Task } from '../types/task'

const API_URL = 'http://127.0.0.1:8000'

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL + '/tasks')

    if (!response.ok) {
        throw new Error('Failed to fetch tasks')
    }
    
    return response.json()
}
