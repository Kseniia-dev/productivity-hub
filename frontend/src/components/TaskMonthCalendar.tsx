import { DayPicker } from "@daypicker/react"
import { toDateInputValue } from "../utils/taskDate"

type TaskMonthCalendarProps = {
    value: string
    month: Date
    onChange: (date:string) => void
    onMonthChange: (month: Date) => void
}

function TaskMonthCalendar({
    value,
    month,
    onChange,
    onMonthChange,
}: TaskMonthCalendarProps) {
    const selectedDay = new Date(value + 'T12:00:00')

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
            />
        </section>
    )
}

export default TaskMonthCalendar