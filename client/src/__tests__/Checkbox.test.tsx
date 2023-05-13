import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Checkbox from '../components/common/Checkbox'

describe('Checkbox.tsx', () => {
  const title = 'MonthPicker'
  const onChange = vi.fn()

  test('Is checked is null when false is passed', () => {
    const { getByRole } = render(
      <Checkbox title={title} checked={false} onChange={onChange} />
    )
    const inputElement = getByRole('checkbox')
    expect(inputElement.getAttribute('checked')).toBe(null)
  })
  test('Checked is not null when true is passed', () => {
    const { getByRole } = render(
      <Checkbox title={title} checked={true} onChange={onChange} />
    )
    const inputElement = getByRole('checkbox')
    expect(inputElement.getAttribute('checked')).toBe('')
  })
  test('Calls on change handler on', () => {
    const { getByRole } = render(
      <Checkbox title={title} checked={false} onChange={onChange} />
    )
    const inputElement = getByRole('checkbox')
    fireEvent.click(inputElement)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('Renders correct title', () => {
    const { getByText } = render(
      <Checkbox title={title} checked={true} onChange={onChange} />
    )
    const titleElement = getByText(/MonthPicker/i)
    expect(titleElement).toBeDefined()
  })
})
