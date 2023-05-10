import { useMutation } from 'react-query'
import { uploadStationsFromCSV } from '../api/stationApi'
import { useState } from 'react'

const useUploadFile = (setFile: (value: null) => void) => {
  const [message, setMessage] = useState('')
  const {
    mutate: sendFile,
    isError,
    isLoading,
  } = useMutation(uploadStationsFromCSV, {
    onError: (err) => {
      console.log(err)
    },
    onSuccess: (data) => {
      setFile(null)
      setMessage(JSON.stringify(data))
      console.log(data)
    },
  })

  return { sendFile, isError, isLoading, message }
}

export default useUploadFile
