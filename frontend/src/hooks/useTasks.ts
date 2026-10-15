import { useEffect, useState } from "react"

import { getTasks } from "../api/tasks"

import type { Task } from "../types/task"

type UseTasksResult = {
    tasks: Task[]
    isLoading: boolean
    error: string | null
    reloadTasks: () => void
}

export function useTasks(): UseTasksResult {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [reloadCount, setReloadCount] = useState(0)

    function reloadTasks() {
        setReloadCount((count) => count + 1)
    }

    useEffect(() => {
        async function loadTasks() {
            setIsLoading(true)
            setError(null)

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
    }, [reloadCount])
    return { tasks, isLoading, error, reloadTasks }
}