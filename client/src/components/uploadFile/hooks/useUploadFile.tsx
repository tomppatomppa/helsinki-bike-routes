import { useMutation, useQueryClient } from 'react-query'

import { useState } from 'react'
import { uploadFile } from '../../../api/uploadApi'

const useUploadFile = (setFile: (value: null) => void) => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')

  const {
    mutate: sendFile,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(uploadFile, {
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
