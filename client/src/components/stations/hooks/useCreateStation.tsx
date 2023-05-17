import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createStation } from '../../../api/stationApi'

const useCreateStation = () => {
  const queryClient = useQueryClient()
  const [nextID, setNextID] = useState<number | null>(null)

  const {
    mutate: sendStationForm,
    isLoading,
    isSuccess,
    data: station,
  } = useMutation(createStation, {
    onError: ({ response }) => {
      const ID = response?.data?.nextAvailableID
      if (ID) {
        setNextID(ID)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('stations')
    },
  })

  return { sendStationForm, nextID, isLoading, isSuccess, station }
}

export default useCreateStation
