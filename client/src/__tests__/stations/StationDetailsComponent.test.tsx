import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import StationDetailsComponent from '../../components/stations/StationDetailsComponent'

const station = {
  Nimi: 'Hanasaari',
  Name: 'Hanasaari',
  Namn: 'Hanaholmen',
  Osoite: 'Hanasaarenranta 1',
  Adress: 'Hanaholmsstranden 1',
  departures_count: 1,
  returns_count: 0,
  average_distance_departures: 3867,
  average_distance_returns: 3882,
  most_common_return_stations: [
    'Tapionaukio Count: 30',
    'Otaranta Count: 14',
    'Jämeräntaival Count: 20',
    'Niittymaa Count: 32',
    'Niittykumpu (M) Count: 20',
  ],
  most_common_departure_stations: [
    'Hanasaari Count: 12',
    'Keilalahti Count: 14',
    'Jämeräntaival Count: 20',
    'Suomenlahdentie Count: 14',
    'Lehtisaarentie Count: 16',
  ],
}

describe('StationDetailsComponent test', () => {
  test('Should render station-info div and correct content', () => {
    const result = render(<StationDetailsComponent station={station} />)
    const stationInfo = result.container.querySelector('#station-info')
    expect(stationInfo).toBeDefined()
    expect(stationInfo?.textContent).toContain('Station info:')
    expect(stationInfo?.textContent).toContain(
      `Departures from station: ${station.departures_count}`
    )
    expect(stationInfo?.textContent).toContain(
      `Returns to station: ${station.returns_count}`
    )
    expect(stationInfo?.textContent).toContain(
      `Avg. distance for departures (m): ${
        station.average_distance_departures | 0
      }`
    )
    expect(stationInfo?.textContent).toContain(
      `Avg. distance for returns (m): ${station.average_distance_returns | 0}`
    )
  })
  test('Should render station-avg-1 div and 5 li items', () => {
    const result = render(<StationDetailsComponent station={station} />)
    const stationInfo = result.container.querySelector('#station-avg-1')

    expect(stationInfo).toBeDefined()
    expect(stationInfo?.textContent).toContain(
      'Top 5 return stations for journey:'
    )
    const returnStations = stationInfo?.querySelectorAll('li')
    expect(returnStations).toHaveLength(
      station.most_common_return_stations.length
    )
    station.most_common_return_stations.forEach((station, index) => {
      expect(returnStations?.[index].textContent).toBe(station)
    })
  })
  test('Should render station-avg-2 div and 5 li items', () => {
    const result = render(<StationDetailsComponent station={station} />)
    const stationInfo = result.container.querySelector('#station-avg-2')

    expect(stationInfo).toBeDefined()
    expect(stationInfo?.textContent).toContain(
      'Top 5 departure stations for journey:'
    )
    const returnStations = stationInfo?.querySelectorAll('li')
    expect(returnStations).toHaveLength(
      station.most_common_return_stations.length
    )
    station.most_common_departure_stations.forEach((station, index) => {
      expect(returnStations?.[index].textContent).toBe(station)
    })
  })
})
