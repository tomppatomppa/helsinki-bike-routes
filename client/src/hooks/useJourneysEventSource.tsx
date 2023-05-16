import { useState } from 'react'
const useJourneysEventSource = () => {
  const [message, setMessage] = useState<string>('')
  const eventSource = new EventSource(
    'http://localhost:3001/api/journeys/events'
  )

  eventSource.addEventListener('message', (event) => {
    setMessage(event.data)
  })

  eventSource.addEventListener('error', (error) => {
    console.error('SSE error:', error)
  })
  return message
}

export default useJourneysEventSource
