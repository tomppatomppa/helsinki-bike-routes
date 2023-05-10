import { describe, expect, test, vi } from 'vitest'
import { screen, render, within } from '@testing-library/react'
import JourneyTable from '../components/JourneyTable'
import { Journey } from '../types/journey'

const journeys: Journey[] = [
  {
    id: 1,
    Departure_station_name: 'Hanasaari',
    Departure_station_id: 2,
    Return_station_name: 'Keilalahti',
    Return_station_id: 2,
    Covered_distance_m: 2043,
    Duration_sec: 600,
  },
  {
    id: 2,
    Departure_station_name: 'Hanasaari',
    Departure_station_id: 2,
    Return_station_name: 'Keilalahti',
    Return_station_id: 2,
    Covered_distance_m: 2043,
    Duration_sec: 600,
  },
]

describe('JourneyTable', () => {
  test('renders correct number of headers', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(4)
  })

  test('renders correct headers', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)

    const departureStationHeader = screen.getByRole('columnheader', {
      name: /Departure Station/i,
    })
    const returnStationHeader = screen.getByRole('columnheader', {
      name: /Return Station/i,
    })
    const distanceHeader = screen.getByRole('columnheader', {
      name: /Distance/i,
    })
    const duratinHeader = screen.getByRole('columnheader', {
      name: /Duration/i,
    })

    expect(departureStationHeader).toBeDefined()
    expect(returnStationHeader).toBeDefined()
    expect(distanceHeader).toBeDefined()
    expect(duratinHeader).toBeDefined()
  })

  test('renders correct number of table rows', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)

    const tbody = screen.getByTestId('table-rows')
    const rows = within(tbody).getAllByRole('row')

    expect(rows).toHaveLength(journeys.length)
  })
})
