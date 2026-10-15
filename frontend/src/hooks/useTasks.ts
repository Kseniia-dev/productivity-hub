import { useEffect, useState } from "react"

import { getTasks } from "../api/tasks"

import type { Task } from "../types/task"

type UseTasksResult = {
    tasks: Task[]
    isLoading: boolean
    error: string | null
}

export function useTasks(): UseTasksResult {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadTasks() {
            try {
                const loadedTasks = await getTasks()
                setTasks(loadedTasks)
            } catch {
                setError('Failed to load tasks')
            } finally {
                setIsLoading(false)
            }
        }
        loadTasks()
    }, [])
    return { tasks, isLoading, error }
}