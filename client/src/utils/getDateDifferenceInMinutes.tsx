export function getDateDifferenceInMinutes(date: Date, date2: Date) {
  return Math.abs(date.getTime() - date2.getTime()) / 1000
}
