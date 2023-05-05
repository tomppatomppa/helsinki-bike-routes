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
}
describe('StationDetailsComponent test', () => {
  test('Should show station data', () => {
    render(<StationDetailsComponent station={station} />)

    expect(screen.getByText(/STATION DETAILS/i)).toBeDefined()
    expect(screen.getByText(/Hanasaari/i)).toBeDefined()
    expect(screen.getByText(/Hanaholmen/i)).toBeDefined()
    expect(screen.getByText(/Hanasaarenranta 1/i)).toBeDefined()
    expect(screen.getByText(/Departures from station: 1/i)).toBeDefined()
    expect(screen.getByText(/Returns to station: 0/i)).toBeDefined()
  })
})
