import { useMutation, useQueryClient } from 'react-query'

import { uploadFile } from '../../../api/uploadApi'

const useUploadFile = () => {
  const queryClient = useQueryClient()
  const {
    data,
    mutate: sendFile,
    isError,
    isLoading,
    isSuccess,
  } = useMutation(uploadFile, {
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return { sendFile, isError, isLoading, isSuccess, data }
}

export default useUploadFile
