import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import userEvent from '@testing-library/user-event'
import { AddJourneyForm } from '../components/journeys/AddJourneyForm'

describe('AddJourneyForm.tsx', () => {
  const props = {
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
    stations: [],
  }
  test('Renders required labels', () => {
    const { getByLabelText } = render(<AddJourneyForm {...props} />)

    expect(getByLabelText(/Departure station/i))
    expect(getByLabelText(/Return station/i))
    expect(getByLabelText(/Departure Date/i))
    expect(getByLabelText(/Return Date/i))
    expect(getByLabelText(/Duration/i))
    expect(getByLabelText(/Covered distance/i))
  })
  test('Should not send form when required field is missing', async () => {
    render(
      <AddJourneyForm
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={() => {}}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={() => {}}
        stations={[
          { Name: 'Hansaari', ID: 1 },
          { Name: 'Kasarmitori', ID: 2 },
        ]}
      />
    )
    const user = userEvent
    await user.click(screen.getByRole('button', { name: /save/i }))
    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })
  test('Should send form when all required fields are set', async () => {
    render(
      <AddJourneyForm
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSubmit={props.onSubmit}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel={() => {}}
        stations={[
          { Name: 'Hanasaari', ID: 1 },
          { Name: 'Kasarmitori', ID: 2 },
        ]}
      />
    )
    const user = userEvent

    const inputElement = screen.getByTestId('departure-input')
    await userEvent.click(inputElement)
    const optionElement = screen.getByText('Hanasaari')
    await userEvent.click(optionElement)
    const returnElement = screen.getByTestId('return-input')
    await userEvent.click(returnElement)
    const optionElement2 = screen.getByText('Kasarmitori')
    await userEvent.click(optionElement2)

    const returnInputElement = document.getElementById(
      'Return'
    ) as HTMLInputElement
    const currentDate = new Date()
    const numberOfDaysToAdd = 1
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd)
    const newDateFormatted = currentDate.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })

    fireEvent.change(returnInputElement, {
      target: { value: newDateFormatted },
    })

    const distanceElement = screen.getByPlaceholderText('Covered_distance_m')
    await userEvent.type(distanceElement, '12345')

    await user.click(screen.getByRole('button', { name: /save/i }))
    await waitFor(() => {
      const submittedData = props.onSubmit.mock.calls[0][0]
      expect(submittedData).toContain({
        Covered_distance_m: 12345,
        Departure_station_name: 'Hanasaari',
        Departure_station_id: 1,
        Return_station_name: 'Kasarmitori',
        Return_station_id: 2,
      })
    })
  })
})
