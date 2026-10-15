import { useTasks } from '../hooks/useTasks'

import TaskListState from '../components/TaskListState'

function HomePage() {
  const { tasks, isLoading, error } = useTasks()
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
