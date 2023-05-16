import { useEffect, useState } from 'react'

const useUploadProgress = (isLoading: boolean) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [eventSource, setEventSource] = useState<EventSource | null>(null)

  useEffect(() => {
    if (isLoading) {
      const eventSource = new EventSource('/api/journeys/events')
      setEventSource(eventSource)
    }
    return () => {
      setEventSource(null)
      setUploadProgress(0)
    }
  }, [isLoading])

  eventSource?.addEventListener('message', (event) => {
    const parsedValue = parseFloat(event.data)
    if (parsedValue) {
      setUploadProgress(parsedValue)
    }
  })

  return uploadProgress
}

export default useUploadProgress
