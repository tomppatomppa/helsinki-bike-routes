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

export interface StationDetails {
  Nimi: string
  Namn: string
  Name: string
  Osoite: string
  Adress: string
  departures_count: number
  returns_count: number
}
