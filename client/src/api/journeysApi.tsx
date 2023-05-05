import axios from 'axios'
import { Journey } from '../types/journey'

const baseUrl = '/api/journeys'

export interface JourneysDataWithCursor {
  count: number
  rows: Journey[]
  nextCursor: number | undefined
}

export const fetchStationsByCursor = async (
  cursor: number,
  limit: number,
  search: string,
  search_field: string
) => {
  const { data } = await axios.get<JourneysDataWithCursor>(baseUrl, {
    params: { offset: cursor, limit, search, search_field },
  })

  return data
}
