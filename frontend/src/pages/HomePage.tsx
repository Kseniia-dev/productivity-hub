import { useState } from 'react'

import { useTasks } from '../hooks/useTasks'

import TaskListState from '../components/TaskListState'

import type { TaskStatusFilterValue } from '../types/task'

import TaskStatusFilter from '../components/TaskStatusFilter'

import { getTodayDate } from '../utils/taskDate'

import TaskDateNavigation from '../components/TaskDateNavigation'

import TaskMonthCalendar from '../components/TaskMonthCalendar'


function HomePage() {
  const { tasks, isLoading, error, reloadTasks } = useTasks()
  const [selectedStatus, setSelectedStatus] =
    useState<TaskStatusFilterValue>('all')
  const [selectedDate, setSelectedDate] = useState(getTodayDate)
  const [visibleMonth, setVisibleMonth] = useState(() => {
    return new Date(selectedDate + 'T12:00:00')
  })
  function handleDateChange(date: string) {
    setSelectedDate(date)
    setVisibleMonth(new Date(date + 'T12:00:00'))
  }
  const dateTasks = tasks.filter((task) => {
    return task.date === selectedDate
  })
  const filteredTasks = dateTasks.filter((task) => {
    return selectedStatus === 'all' || task.status === selectedStatus
  })
  const emptyMessage = dateTasks.length === 0
      ? 'No tasks for this day'
      : 'No tasks match this status on this day'
  return (
    <main>
      <h1>ProductivityHub</h1>
      <p>Plan your day, focus your work, track your progress</p>
      
      <TaskMonthCalendar
          value={selectedDate}
          tasks={tasks}
          month={visibleMonth}
          onChange={handleDateChange}
          onMonthChange={setVisibleMonth}
      />

      <TaskDateNavigation
          value={selectedDate}
          onChange={handleDateChange}
      />

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
