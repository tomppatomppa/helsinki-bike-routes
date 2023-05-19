export interface StationCommonFields {
  ID: number
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
}
export interface Station extends StationCommonFields {
  x: number
  y: number
}

export interface StationNameAndID {
  Name: string
  ID: number
}

export interface StationFormFields extends StationCommonFields {
  Kaupunki?: string
  Stad?: string
  Operaattor?: string
  Kapasiteet: number
}

export interface StationDetails extends Omit<StationCommonFields, 'ID'> {
  departures_count: number
  returns_count: number
  average_distance_departures: number
  average_distance_returns: number
  most_common_return_stations: string[]
  most_common_departure_stations: string[]
}

export interface CreatedStationFields extends StationCommonFields {
  FID: number
  Kapasiteet: number
  Kaupunki: string
  Stad: string
  createdAt: string
  updatedAt: string
}

export enum StationTableColumns {
  Name = 'Name',
  Namn = 'Namn',
  Nimi = 'Nimi',
  Osoite = 'Osoite',
  Adress = 'Adress',
}
