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

  return { sendStationForm, nextID, isLoading, isSuccess }
}

export default useCreateStation
