import { useEffect, useState } from 'react'

import { getTasks } from '../api/tasks'

import type { Task } from '../types/task'

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

      {isLoading && <p>Loading tasks...</p>}

      {error !== null && <p>{error}</p>}

      {!isLoading && error === null && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default HomePage
