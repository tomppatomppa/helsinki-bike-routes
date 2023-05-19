//Return date in format MMMM d, yyyy h:mm aa
export function getFormattedDate(date: Date) {
  const futureDate = new Date(date.setDate(date.getDate() + 1))
  const formattedDate = futureDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
  return formattedDate
}
