import { getTodayDate, shiftTaskDate } from "../utils/taskDate"

type TaskDateNavigationProps = {
    value: string
    onChange: (date: string) => void
}

function TaskDateNavigation({ value, onChange }: TaskDateNavigationProps) {
    return (
        <div className="task-date">
            <label htmlFor="task-date-input">Date</label>
            <input
                id="task-date-input"
                type="date"
                value={value}
                onChange={(event) => {
                    const nextDate = event.currentTarget.value
                    if (nextDate !== '') {
                        onChange(nextDate)
                    }
                }}
            />
            <div className="task-date-actions">
            <button
                type="button"
                aria-label="Previous day"
                onClick={() => onChange(shiftTaskDate(value, -1))}
            >
                &larr;    
            </button> 
            <button type="button" onClick={() => onChange(getTodayDate())}>
                Today
            </button>
            <button
                type="button"
                aria-label="Next day"
                title="Next day"
                onClick={() => onChange(shiftTaskDate(value, 1))}
            >
                &rarr;
            </button>
            </div>
        </div>
    )
}

export default TaskDateNavigation
