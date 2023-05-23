import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Map from '../components/map/Map'

describe('Map.tsx', () => {
  const station = {
    ID: 1,
    Name: 'station 1',
    Nimi: 'station 1',
    Namn: 'station 1',
    Osoite: 'station 1',
    Adress: 'station 1',
    x: 60,
    y: 60,
  }

  test('Should only show selected station as green marker', () => {
    const { container } = render(<Map station={station} />)
    const markerPane = container.getElementsByClassName(
      'leaflet-pane leaflet-marker-pane'
    )[0]
    const imgElements = markerPane.querySelectorAll('img')
    expect(imgElements).toHaveLength(1)

    expect(imgElements[0].getAttribute('src')).toBe(
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
    )
  })
  test('Should not show any marker', () => {
    const { container } = render(<Map station={null} />)
    const markerPane = container.getElementsByClassName(
      'leaflet-pane leaflet-marker-pane'
    )[0]
    const imgElements = markerPane.querySelectorAll('img')
    expect(imgElements).toHaveLength(0)
  })
})
