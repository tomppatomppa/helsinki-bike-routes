import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import { uploadJourneysFromCSV } from '../api/journeysApi'

const useUploadJourneys = (setFile: (value: null) => void) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')

  const {
    mutate: sendJourneys,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(uploadJourneysFromCSV, {
    onError: (err) => {
      setMessage(JSON.stringify(err))
    },
    onSuccess: (data) => {
      setFile(null)
      setMessage(JSON.stringify(data))
      queryClient.invalidateQueries({ queryKey: ['journeys'] })
    },
  })

  return { sendJourneys, isError, isLoading, message, isSuccess }
}

export default useUploadJourneys
