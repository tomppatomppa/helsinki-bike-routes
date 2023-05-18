import axios from 'axios'
import { Journey, JourneyFormFields, StationAllFields } from '../types/journey'

const baseUrl = '/api/journeys'

export interface JourneysDataWithCursor {
  count: number
  rows: Journey[]
  nextCursor: number | undefined
}

export const fetchJourneysByCursor = async (
  cursor: number,
  limit: number,
  search: string,
  search_field: string,
  order: string[]
) => {
  const { data } = await axios.get<JourneysDataWithCursor>(baseUrl, {
    params: { offset: cursor, limit, search, search_field, order },
  })

  return data
}

export const createJourney = async (journey: JourneyFormFields) => {
  const { data } = await axios.post<StationAllFields>(
    `${baseUrl}/add-single`,
    journey
  )
  return data
}
