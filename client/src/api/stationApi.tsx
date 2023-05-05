import axios from 'axios'
import { Station } from '../types/station'

const baseUrl = '/api/stations'

export interface StationDataWithCursor {
  count: number
  rows: Station[]
  nextCursor: number | undefined
}

export const fetchStationsByCursor = async (
  cursor: number,
  limit: number,
  search: string,
  search_field: string
) => {
  const { data } = await axios.get<StationDataWithCursor>(baseUrl, {
    params: { offset: cursor, limit, search, search_field },
  })

  return data
}