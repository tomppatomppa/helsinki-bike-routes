import { describe, expect, test, vi } from 'vitest'
import {
  screen,
  render,
  within,
  getAllByRole,
  fireEvent,
  getByRole,
  getByDisplayValue,
} from '@testing-library/react'
import Dropdown from '../components/common/Dropdown'

const props = {
  title: 'Search',
  options: ['Name', 'Osoite'],
  value: '',
  onSelect: vi.fn(),
}
describe('Dropdown.tsx', () => {
  test('Should display title', () => {
    render(<Dropdown {...props} />)

    const title = screen.getByText('Search')
    expect(title).toBeDefined()
  })
  test('Should render values in option array', () => {
    render(<Dropdown {...props} />)
    const Name = screen.getByText('Name')
    const Osoite = screen.getByText('Osoite')

    expect(Name).toBeDefined()
    expect(Osoite).toBeDefined()
  })
  test('Should render 2 option components', () => {
    const { getAllByRole } = render(<Dropdown {...props} />)
    const selectElements = getAllByRole('option')

    expect(selectElements).toHaveLength(2)
  })
  test('Should onSelect should receive selected value', async () => {
    const onSelect = vi.fn()
    const { getByRole } = render(
      <Dropdown
        title={props.title}
        value={'Name'}
        options={props.options}
        onSelect={onSelect}
      />
    )
    const selectElement = getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 'Osoite' } })

    expect(onSelect).toHaveBeenCalledOnce()
    expect(onSelect).toHaveBeenCalledWith('Osoite')
  })
})
