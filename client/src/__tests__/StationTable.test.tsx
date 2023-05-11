import { describe, expect, test, vi } from 'vitest'
import { screen, render, within } from '@testing-library/react'

import { Station } from '../types/station'
import StationTable from '../components/StationTable'

const stations: Station[] = [
  {
    ID: 501,
    Nimi: 'Hanasaari',
    Namn: 'Hanaholmen',
    Name: 'Hanasaari',
    Osoite: 'Hanasaarenranta 1',
    Adress: 'Hanaholmsstranden 1',
    x: 60.192051,
    y: 24.945831,
  },
  {
    ID: 502,
    Nimi: 'Hanasaari',
    Namn: 'Hanaholmen',
    Name: 'Hanasaari',
    Osoite: 'Hanasaarenranta 1',
    Adress: 'Hanaholmsstranden 1',
    x: 60.181054,
    y: 24.945131,
  },
]

describe('JourneyTable', () => {
  test('renders correct number of headers + expand row column', () => {
    const onClick = vi.fn()
    render(<StationTable data={stations} onClick={onClick} />)
    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(6)
  })

  test('Headers have correct text content', () => {
    const onClick = vi.fn()
    render(<StationTable data={stations} onClick={onClick} />)
    const headerColumns = screen.getAllByRole('columnheader')

    const expectedHeaders = [
      'Expand',
      'Nimi',
      'Namn',
      'Name',
      'Osoite',
      'Adress',
    ]

    headerColumns.forEach((column) =>
      expect(expectedHeaders.includes(column?.textContent ?? '')).toBeTruthy()
    )
  })

  test('renders correct number of table rows', () => {
    const onClick = vi.fn()
    render(<StationTable data={stations} onClick={onClick} />)
    const tbody = screen.getByTestId('table-rows')
    const rows = within(tbody).getAllByRole('row')

    expect(rows).toHaveLength(stations.length)
  })
})
