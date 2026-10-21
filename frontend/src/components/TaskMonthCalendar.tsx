import { DayPicker } from "@daypicker/react"
import { toDateInputValue } from "../utils/taskDate"
import type { Task } from "../types/task"


type TaskMonthCalendarProps = {
    value: string
    tasks: Task[]
    month: Date
    onChange: (date:string) => void
    onMonthChange: (month: Date) => void
}

function TaskMonthCalendar({
    value,
    tasks,
    month,
    onChange,
    onMonthChange,
}: TaskMonthCalendarProps) {
    const selectedDay = new Date(value + 'T12:00:00')
    const taskDates = new Set(tasks.map((task) => task.date))
    
    return (
        <section className="task-calendar" aria-label="Task calendar">
            <DayPicker
                mode="single"
                required
                selected={selectedDay}
                month={month}
                onMonthChange={onMonthChange}
                onSelect={(day) => {
                    if (day) {
                        onChange(toDateInputValue(day))
                    }
                }}
                weekStartsOn={1}
                navLayout="around"
                showOutsideDays
                fixedWeeks
                modifiers={{
                    hasTasks: (day) => taskDates.has(toDateInputValue(day)),
                }}
                modifiersClassNames={{
                    hasTasks: 'calendar-day-has-tasks'
                }}
            />
        </section>
    )
}

export default TaskMonthCalendar