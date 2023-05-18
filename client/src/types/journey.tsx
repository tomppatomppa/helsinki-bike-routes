export interface Journey {
  id: number
  Departure_station_name: string
  Departure_station_id: number
  Return_station_name: string
  Return_station_id: number
  Covered_distance_m: number
  Duration_sec: number
}

export type StationAllFields = Journey & {
  Departure: Date
  Return: Date
  createdAt: Date
  updatedAt: Date
}
export interface JourneyFormFields {
  Departure_station_name: string
  Departure_station_id: number | string
  Return_station_name: string
  Return_station_id: number | string
  Departure: Date
  Return: Date
}
