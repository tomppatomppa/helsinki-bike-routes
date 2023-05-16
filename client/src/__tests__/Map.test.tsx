import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import Map from '../components/map/Map'
import { LatLngExpression } from 'leaflet'

describe('Map.tsx', () => {
  const allStationCoordinates: LatLngExpression[] = [
    [60.192059, 24.945831],
    [60.292059, 24.145831],
  ]
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

  test('Should render 2 img elements on map', () => {
    const { container } = render(
      <Map station={null} allStationCoordinates={allStationCoordinates} />
    )
    const markerPane = container.getElementsByClassName(
      'leaflet-pane leaflet-marker-pane'
    )[0]
    const imgElements = markerPane.querySelectorAll('img')
    expect(imgElements).toHaveLength(2)
  })
  test('Should only show selected station as green marker', () => {
    const { container } = render(
      <Map station={station} allStationCoordinates={allStationCoordinates} />
    )
    const markerPane = container.getElementsByClassName(
      'leaflet-pane leaflet-marker-pane'
    )[0]
    const imgElements = markerPane.querySelectorAll('img')
    expect(imgElements).toHaveLength(1)

    expect(imgElements[0].getAttribute('src')).toBe(
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
    )
  })
})
