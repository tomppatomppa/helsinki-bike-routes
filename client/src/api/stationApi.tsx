import axios from 'axios'
import { Station, StationDetails, StationFormFields } from '../types/station'

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

export const fetchStationByID = async (
  stationID: number,
  dates: object | null
) => {
  const { data } = await axios.get<StationDetails>(`${baseUrl}/${stationID}`, {
    params: { ...dates },
  })
  return data
}
export const createStation = async (values: StationFormFields) => {
  const { data } = await axios.post<StationDetails>(
    `${baseUrl}/add-single`,
    values
  )
  return data
}
export const deleteStation = async (ID: number) => {
  const { data } = await axios.delete<StationDetails>(`${baseUrl}/${ID}`)
  return data
}
