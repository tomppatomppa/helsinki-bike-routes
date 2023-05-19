import { useMutation, useQueryClient } from 'react-query'

import { uploadFile } from '../../../api/uploadApi'

interface MutationError {
  code: string
  config: any
  message: string
  name: string
  request: XMLHttpRequest
  response: {
    data: any
    status: number
    statusText: string
    headers: any
    config: any
  }
  stack: string
}

const useUploadFile = () => {
  const queryClient = useQueryClient()

  const {
    data,
    mutate: sendFile,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useMutation<any, MutationError, any>(uploadFile, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return { sendFile, isError, isLoading, isSuccess, data, error }
}

export default useUploadFile
