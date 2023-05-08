import { describe, expect, test, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import StationDetailsView from '../components/StationDetailsView'

import { renderWithClient } from './config'

const stationID = 1

describe('StationDetailsView test', () => {
  test('close button should set stationID to null', () => {
    const setStationID = vi.fn()
    renderWithClient(
      <StationDetailsView stationID={stationID} setStationID={setStationID} />
    )
    const closeButton = screen.getByText(/Close/i)

    fireEvent.click(closeButton)
    expect(setStationID).toHaveBeenCalledWith(null)
  })
})
