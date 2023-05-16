import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { StationForm } from '../components/stations/StationForm'

describe('StationForm.tsx', () => {
  const props = {
    onSubmit: vi.fn(),
    onCancel: vi.fn(),
  }

  test('Renders required labels', () => {
    const { getByLabelText } = render(<StationForm {...props} />)

    expect(getByLabelText('ID')).toBeDefined()
    expect(getByLabelText('Nimi')).toBeDefined()
    expect(getByLabelText('Name')).toBeDefined()
    expect(getByLabelText('Namn')).toBeDefined()
    expect(getByLabelText('Osoite')).toBeDefined()
    expect(getByLabelText('Adress')).toBeDefined()
    expect(getByLabelText('Kaupunki')).toBeDefined()
    expect(getByLabelText('Operaattor')).toBeDefined()
    expect(getByLabelText('Kapasiteet')).toBeDefined()
    expect(getByLabelText('x')).toBeDefined()
    expect(getByLabelText('y')).toBeDefined()
  })
})
