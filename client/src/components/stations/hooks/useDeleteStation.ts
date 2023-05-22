import { useMutation, useQueryClient } from 'react-query'
import { deleteStation } from '../../../api/stationApi'

const useDeleteStation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteStation, {
    onSuccess: () => {
      queryClient.invalidateQueries('stations')
    },
  })
}

export default useDeleteStation
