export function formatTaskDate(date: string) {
    const parsedDate = new Date(date + 'T12:00:00')

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(parsedDate)
}

export function formatTaskTime(time: string) {
    return time.slice(0, 5)
}