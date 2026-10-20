export function toDateInputValue(date: Date) {
    const year = String(date.getFullYear()).padStart(4, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

export function getTodayDate() {
    return toDateInputValue(new Date())
}

export function shiftTaskDate(date: string, offset: number) {
    const parsedDate = new Date(date + 'T12:00:00')
    parsedDate.setDate(parsedDate.getDate() + offset)

    return toDateInputValue(parsedDate)
}