import { useState } from 'react'

import { useTasks } from '../hooks/useTasks'

import TaskListState from '../components/TaskListState'

import type { TaskStatusFilterValue } from '../types/task'

import TaskStatusFilter from '../components/TaskStatusFilter'


function HomePage() {
  const { tasks, isLoading, error, reloadTasks } = useTasks()
  const [selectedStatus, setSelectedStatus] =
    useState<TaskStatusFilterValue>('all')
  const filteredTasks = tasks.filter((task) => {
    return selectedStatus === 'all' || task.status === selectedStatus
  })
  const emptyMessage = tasks.length === 0
      ? 'No tasks yet'
      : 'No tasks match this status'
  return (
    <main>
      <h1>ProductivityHub</h1>
      <p>Plan your day, focus your work, track your progress</p>

      <TaskStatusFilter
          value={selectedStatus}
          onChange={setSelectedStatus}
      />
      
      <TaskListState
        tasks={filteredTasks}
        isLoading={isLoading}
        error={error}
        onRetry={reloadTasks}
        emptyMessage={emptyMessage}
      />
    </main>
  )
}

export default HomePage
