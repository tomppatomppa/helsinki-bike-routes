import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JourneyFormInput from '../components/journeys/JourneyFormInput'

describe('JourneyFormInput.tsx', () => {
  const props = {
    onClick: vi.fn(),
    value: 'hello',
    options: [
      { Name: 'station1', ID: 1 },
      { Name: 'station2', ID: 2 },
    ],
  }
  test('Should not render options on initially', () => {
    render(<JourneyFormInput {...props} />)

    const station1 = screen.queryByText('station1')
    const station2 = screen.queryByText('station2')
    expect(station1).toBeNull()
    expect(station2).toBeNull()
  })
  test('Should render options when input is focused', async () => {
    render(<JourneyFormInput {...props} />)

    const inputElement = screen.getByRole('textbox')
    await userEvent.click(inputElement)

    const station1 = screen.queryByText('station1')
    const station2 = screen.queryByText('station2')

    expect(station1).toBeDefined()
    expect(station2).toBeDefined()
  })

  test('Should have called onClick with the selected value', async () => {
    render(<JourneyFormInput {...props} />)

    const inputElement = screen.getByRole('textbox')
    await userEvent.click(inputElement)

    screen.getByText('station1')?.click()

    expect(props.onClick).toHaveBeenCalledOnce()
    expect(props.onClick).toHaveBeenCalledWith({ Name: 'station1', ID: 1 })
  })

  test('Should filter out option based on searchValue', async () => {
    render(<JourneyFormInput {...props} />)
    screen.debug()

    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(inputElement, 'station1')

    const filteredOptions = screen.queryAllByRole('option')
    expect(filteredOptions.length).toBe(1)
  })
})
