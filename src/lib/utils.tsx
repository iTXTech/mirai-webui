export function formatDate(date:Date) {
    if(!(date instanceof Date)) {
        date = new Date(date)
    }
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}