import { describe, expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import SearchBar from '../components/common/SearchBar'

describe('SearchBar.tsx', () => {
  const props = {
    search: 'Test search',
    search_field: 'Test field',
    options: ['Option 1', 'Option 2', 'Option 3'],
    setSearch: vi.fn(),
    findByField: vi.fn(),
  }
  test('should render the search bar with a dropdown and input field', () => {
    const { getByLabelText, getByText } = render(<SearchBar {...props} />)
    const dropdownTitle = getByText('Search by')
    const dropdownOption1 = getByText('Option 1')
    const dropdownOption2 = getByText('Option 2')
    const dropdownOption3 = getByText('Option 3')
    const searchInput = getByLabelText('Search Stations:')

    expect(dropdownTitle).toBeDefined()
    expect(dropdownOption1).toBeDefined()
    expect(dropdownOption2).toBeDefined()
    expect(dropdownOption3).toBeDefined()
    expect(searchInput).toBeDefined()
    expect(searchInput.textContent).toEqual('')
  })

  test('should call the setSearch function when the search input field is changed', () => {
    const { getByLabelText } = render(<SearchBar {...props} />)

    const searchInput = getByLabelText('Search Stations:')
    fireEvent.change(searchInput, { target: { value: 'New search' } })

    expect(props.setSearch).toHaveBeenCalledWith('New search')
  })

  test('should disable the search input field if no search field is selected', () => {
    const { getByLabelText } = render(<SearchBar {...props} search_field="" />)
    const searchInput = getByLabelText('Search Stations:')
    expect(searchInput).toHaveProperty('disabled', true)
  })
})
