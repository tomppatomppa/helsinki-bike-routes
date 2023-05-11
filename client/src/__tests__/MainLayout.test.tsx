import { describe, expect, test, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'

import MainLayout from '../components/layout/MainLayout'
import Header from '../components/layout/Components/Header'

describe('MainLayout', () => {
  test('Renders Header and Footer by default and sidebar is hidden', () => {
    render(<MainLayout />)

    const header = screen.getByText(/Helsinki city bike app/i)
    const footer = screen.getByText(/Footer/i)
    const sidebar = screen.queryByTestId('sidebar-element')

    expect(header).toBeDefined()
    expect(footer).toBeDefined()
    expect(sidebar).toBeNull()
  })

  test('Header handleSetSidebar prop is called once', () => {
    const handleSetSidebar = vi.fn()
    render(<Header handleSetSidebar={handleSetSidebar} />)

    const toggleButton = screen.getByRole('button', { name: /Toggle Sidebar/i })
    fireEvent.click(toggleButton)

    expect(handleSetSidebar).toHaveBeenCalledOnce()
  })
})
