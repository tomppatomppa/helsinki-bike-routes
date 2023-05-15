import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { MonthSelector } from '../components/common/MonthSelector'

const currentMonth = 5
const currentYear = 2021

const startDate = new Date(currentYear, currentMonth - 1, 2)
  .toISOString()
  .slice(0, 10)
const endDate = new Date(currentYear, currentMonth, 1)
  .toISOString()
  .slice(0, 10)

describe('MonthSelector.tsx', () => {
  const setDates = vi.fn()
  test('Default date is current month and current year', () => {
    const { getByText } = render(
      <MonthSelector dates={null} setDates={setDates} />
    )
    const spanElement = getByText(`${currentMonth}/${currentYear}`)
    expect(spanElement).toBeDefined()
  })
  test('Clicking button "Next Month" advances month by +1', () => {
    const { getByText } = render(
      <MonthSelector dates={null} setDates={setDates} />
    )
    const nextButton = getByText(/Next Month/i)
    fireEvent.click(nextButton)

    const spanElement = getByText(`${currentMonth + 1}/${currentYear}`)
    expect(spanElement).toBeDefined()
  })
  test('Clicking button "Previous Month" decreases month by -1', () => {
    const { getByText } = render(
      <MonthSelector dates={null} setDates={setDates} />
    )
    const previoustButton = getByText(/Previous Month/i)
    fireEvent.click(previoustButton)

    const spanElement = getByText(`${currentMonth - 1}/${currentYear}`)
    expect(spanElement).toBeDefined()
  })
  test('Clicking setDates gets called with current month start and end dates', () => {
    const { getByText } = render(
      <MonthSelector dates={null} setDates={setDates} />
    )
    const applyButton = getByText(/Apply/i)
    fireEvent.click(applyButton)

    expect(setDates).toHaveBeenCalledWith({ startDate, endDate })
  })
  test('Apply button is hidden when dates match', async () => {
    const { queryByText } = render(
      <MonthSelector dates={{ startDate, endDate }} setDates={setDates} />
    )
    const applyButton = queryByText(/Apply/i)
    expect(applyButton).toBeFalsy()
  })
})
