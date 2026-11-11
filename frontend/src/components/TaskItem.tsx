import type { Task } from '../types/task'

import { formatTaskDate, formatTaskTime } from '../utils/formatTask'

import TaskStatusBadge from './TaskStatusBadge'

import TaskStatusSelect  from './TaskStatusSelect'

import TaskDeleteButton from './TaskDeleteButton'

import TaskEditForm from './TaskEditForm'

import { useState } from 'react'


type TaskItemProps = {
  task: Task
  onTaskUpdated: () => void
}

function TaskItem({ task, onTaskUpdated }: TaskItemProps) { 
    const [isEditing, setIsEditing] = useState(false)
    function handleTaskSaved() {
        setIsEditing(false)
        onTaskUpdated()
    }   
    return (
        <li className="task-card">
            <h2 className="task-title">{task.title}</h2>
            
            <p className="task-meta">
                Status: {''}
                <TaskStatusBadge status={task.status} />
            </p>
            
            <p className="task-meta">Date: {formatTaskDate(task.date)}</p>

            {isEditing ? (
                <TaskEditForm
                    task={task}
                    onCancel={() => setIsEditing(false)}
                    onSaved={handleTaskSaved}
                />
            ) : (
                <>
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
    
                    <button
                        type="button"
                        className="task-edit-trigger"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
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
                </>
            )}
        </li>
    )
}

export default TaskItem