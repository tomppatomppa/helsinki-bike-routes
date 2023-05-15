import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import StationDetailsComponent from '../components/StationDetailsComponent'

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
  test('Should show station data', () => {
    render(<StationDetailsComponent station={station} />)

    expect(screen.getByText(/STATION DETAILS/i)).toBeDefined()
    expect(screen.getByText(/Hanasaari, Hanaholmen, Hanasaari/i)).toBeDefined()
    expect(screen.getByText(/Hanasaarenranta 1/i)).toBeDefined()
    expect(screen.getByText(/Departures from station: 1/i)).toBeDefined()
    expect(screen.getByText(/Returns to station: 0/i)).toBeDefined()
    expect(
      screen.getByText('Avg. distance for departures (m): 3867')
    ).toBeDefined()
    expect(
      screen.getByText('Avg. distance for returns (m): 3882')
    ).toBeDefined()

    expect(screen.getByText(/Tapionaukio Count: 30/i)).toBeDefined()
    expect(screen.getByText(/Otaranta Count: 14/i)).toBeDefined()
    expect(screen.getByText('Jämeräntaival Count: 20')).toBeDefined()
    expect(screen.getByText(/Niittymaa Count: 32/i)).toBeDefined()
    expect(screen.getByText(/Niittykumpu (M) Count: 20/i)).toBeDefined()
  })
})
