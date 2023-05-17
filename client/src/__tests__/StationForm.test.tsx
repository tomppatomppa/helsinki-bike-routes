import { describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { StationForm } from '../components/stations/StationForm'
import userEvent from '@testing-library/user-event'

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
  test('Calls onCancel once', async () => {
    const onCancel = vi.fn()
    const user = userEvent
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const { getByRole } = render(
      <StationForm onCancel={onCancel} onSubmit={() => {}} />
    )
    await user.click(getByRole('button', { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
  test('Submits correct values', async () => {
    const handleSubmit = vi.fn()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<StationForm onCancel={() => {}} onSubmit={handleSubmit} />)

    const user = userEvent

    user.clear(screen.getByLabelText('ID'))
    await user.type(screen.getByLabelText('ID'), '504')
    await user.type(screen.getByLabelText('Nimi'), 'Hanasaari')
    await user.type(screen.getByLabelText('Name'), 'Hanasaari')
    await user.type(screen.getByLabelText('Namn'), 'Hanaholmen')
    await user.type(screen.getByLabelText('Osoite'), 'Hanasaarenranta 1')
    await user.type(screen.getByLabelText('Adress'), 'Hanaholmsstranden 1')
    await user.type(screen.getByLabelText('Kaupunki'), 'Espoo')
    await user.type(screen.getByLabelText('Stad'), 'Esbo')
    await user.type(screen.getByLabelText('Kapasiteet'), '20')
    await user.type(screen.getByLabelText('Operaattor'), 'Helsinki City Bikes')
    await user.type(screen.getByLabelText('x'), '60.42')
    await user.type(screen.getByLabelText('y'), '24.87')

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(handleSubmit).toHaveBeenCalledOnce()
    await waitFor(() => {
      const submittedData = handleSubmit.mock.calls[0][0]
      expect(submittedData).toContain({
        ID: 504,
        Name: 'Hanasaari',
        Namn: 'Hanaholmen',
        Nimi: 'Hanasaari',
        Osoite: 'Hanasaarenranta 1',
        Adress: 'Hanaholmsstranden 1',
        Kaupunki: 'Espoo',
        Stad: 'Esbo',
        Operaattor: 'Helsinki City Bikes',
        Kapasiteet: 20,
        x: 60.42,
        y: 24.87,
      })
    })
  })
  test('Should not send when validation fails', async () => {
    const handleSubmit = vi.fn()

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render(<StationForm onCancel={() => {}} onSubmit={handleSubmit} />)

    const user = userEvent
    await user.click(screen.getByRole('button', { name: /submit/i }))
    const divElement = screen.getAllByText('Required')
    expect(handleSubmit).toHaveBeenCalledTimes(0)
    expect(divElement).toBeDefined()
  })
})
