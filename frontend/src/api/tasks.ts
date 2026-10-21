import type { Task, TaskCreate } from '../types/task'

const API_URL = 'http://127.0.0.1:8000'

export async function getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL + '/tasks')

    if (!response.ok) {
        throw new Error('Failed to fetch tasks')
    }
    
    return response.json()
}

export async function createTask(
    taskData: TaskCreate,
): Promise<Task> {
    const response = await fetch(API_URL + '/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(taskData),
    })
    
    if (!response.ok) {
        throw new Error('Failed to create task')
    }

    return response.json()
}

