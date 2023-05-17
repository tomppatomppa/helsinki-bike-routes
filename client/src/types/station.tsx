export interface Station {
  ID: number
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
  x: number
  y: number
}

export type StationFormFields = Station & {
  Kaupunki?: string
  Stad?: string
  Operaattor?: string
  Kapasiteet: number
  x: number
  y: number
}

export interface StationDetails {
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
  departures_count: number
  returns_count: number
  average_distance_departures: number
  average_distance_returns: number
  most_common_return_stations: string[]
  most_common_departure_stations: string[]
}

export interface CreatedStationFields {
  FID: number
  ID: number
  Kapasiteet: number
  Kaupunki: string
  Name: string
  Namn: string
  Nimi: string
  Operaattor: string
  Osoite: string
  Stad: string
  createdAt: string
  updatedAt: string
  x: number
  y: number
}
