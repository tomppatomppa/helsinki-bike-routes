import axios from 'axios'
import { Station } from '../types/station'

const baseUrl = '/api/stations'

export interface StationDataWithCursor {
  count: number
  rows: Station[]
  nextCursor: number
}

export const fetchStationsByCursor = async (cursor: number) => {
  const { data } = await axios.get<StationDataWithCursor>(baseUrl, {
    params: { offset: cursor },
  })

  return data
}
