import type { Task } from '../types/task'

import { formatTaskDate, formatTaskTime } from '../utils/formatTask'

import TaskStatusBadge from './TaskStatusBadge'

import TaskStatusSelect  from './TaskStatusSelect'

import TaskDeleteButton from './TaskDeleteButton'

type TaskItemProps = {
  task: Task
  onTaskUpdated: () => void
}

function TaskItem({ task, onTaskUpdated }: TaskItemProps) {    
    return (
        <li className="task-card">
            <h2 className="task-title">{task.title}</h2>
            
            <p className="task-meta">
                Status: {''}
                <TaskStatusBadge status={task.status} />
            </p>
            
            <p className="task-meta">Date: {formatTaskDate(task.date)}</p>

            {task.description !== null && (
                <p className="task-description">{task.description}</p>
            )}
            {task.start_time !== null && (
                <p className="task-meta">
                    Start: {formatTaskTime(task.start_time)}
                </p>
            )}
            {task.estimated_minutes !== null && (
                <p className="task-meta">Estimate: {task.estimated_minutes} min</p>
            )}
            <TaskStatusSelect
                taskId={task.id}
                status={task.status}
                onUpdated={onTaskUpdated}
            />
            <TaskDeleteButton
                taskId={task.id}
                taskTitle={task.title}
                onDeleted={onTaskUpdated}
            />
        </li>
    )
}

export default TaskItem