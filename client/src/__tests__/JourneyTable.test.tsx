import { describe, expect, test, vi } from 'vitest'
import {
  screen,
  render,
  within,
  getByRole,
  getAllByRole,
} from '@testing-library/react'
import JourneyTable from '../components/journeys/JourneyTable'
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

describe('JourneyTable.tsx', () => {
  test('renders correct number of headers', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(4)
  })

  test('Renders correct headers content', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)

    screen.getByRole('columnheader', {
      name: /Departure Station/i,
    })
    screen.getByRole('columnheader', {
      name: /Return Station/i,
    })
    screen.getByRole('columnheader', {
      name: /Distance/i,
    })
    screen.getByRole('columnheader', {
      name: /Duration/i,
    })
  })

  test('Renders correct number of table rows', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)

    const tbody = screen.getByTestId('table-rows')
    const rows = within(tbody).getAllByRole('row')

    expect(rows).toHaveLength(journeys.length)
  })
  test('Renders correct table content', () => {
    const orderByColumn = vi.fn()
    render(<JourneyTable data={journeys} orderByColumn={orderByColumn} />)
    const tbody = screen.getByTestId('table-rows')
    const rows = within(tbody).getAllByRole('row')

    rows.forEach((row, index) => {
      const journey = journeys[index]
      const cells = within(row).getAllByRole('cell')

      expect(cells[0].textContent).toEqual(journey.Departure_station_name)
      expect(cells[1].textContent).toEqual(journey.Return_station_name)
      expect(cells[2].textContent).toEqual(
        journey.Covered_distance_m.toString()
      )
      expect(cells[3].textContent).toEqual(journey.Duration_sec.toString())
    })
  })
})
