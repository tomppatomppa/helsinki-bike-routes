import React from 'react'
import { useMutation } from 'react-query'
import { deleteStation } from '../../../api/stationApi'

const useDeleteStation = () => {
  return useMutation(deleteStation, {})
  return <div>useDeleteStation</div>
}

export default useDeleteStation
