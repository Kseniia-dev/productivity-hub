import { useEffect, useState } from 'react'

import { getTasks } from '../api/tasks'

import type { Task } from '../types/task'

import TaskListState from '../components/TaskListState'

function HomePage() {
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

  return (
    <main>
      <h1>ProductivityHub</h1>
      <p>Plan your day, focus your work, track your progress</p>
      
      <TaskListState
        tasks={tasks}
        isLoading={isLoading}
        error={error}
      />
    </main>
  )
}

export default HomePage
