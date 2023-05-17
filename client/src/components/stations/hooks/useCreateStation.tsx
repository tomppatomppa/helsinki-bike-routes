import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createStation } from '../../../api/stationApi'

const useCreateStation = (setShowModal: (value: string) => void) => {
  const queryClient = useQueryClient()
  const [nextID, setNextID] = useState<number | null>(null)

  const { mutate: sendStationForm, isLoading } = useMutation(createStation, {
    onError: ({ response }) => {
      const ID = response?.data?.nextAvailableID
      if (ID) {
        console.log('set')
        setNextID(ID)
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('stations')
      setShowModal(`Station ${data.Name} created`)
    },
  })

  return { sendStationForm, nextID, isLoading }
}

export default useCreateStation
