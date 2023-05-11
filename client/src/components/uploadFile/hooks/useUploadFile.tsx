import { useMutation, useQueryClient } from 'react-query'
import { uploadStationsFromCSV } from '../../../api/stationApi'
import { useState } from 'react'

const useUploadFile = (setFile: (value: null) => void) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')

  const {
    mutate: sendFile,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(uploadStationsFromCSV, {
    onError: (err) => {
      setMessage(JSON.stringify(err))
      console.log(err)
    },
    onSuccess: (data) => {
      setFile(null)
      setMessage(JSON.stringify(data))
      queryClient.invalidateQueries()
    },
  })

  return { sendFile, isError, isLoading, message, isSuccess }
}

export default useUploadFile
