import { describe, expect, test, vi } from 'vitest'
import { screen, render, fireEvent } from '@testing-library/react'

import MainLayout from '../../components/layout/MainLayout'
import Header from '../../components/layout/Components/Header'

describe('MainLayout', () => {
  test('Renders Header and Footer by default and sidebar is hidden', () => {
    render(<MainLayout />)

    screen.getByText(/Helsinki city bike app/i)
    screen.getByText(/Created by Tomi West./i)
    const sidebar = screen.queryByTestId('sidebar-element')

    expect(sidebar).toBeNull()
  })

  test('Header handleSetSidebar prop has been called once', () => {
    const handleSetSidebar = vi.fn()
    render(<Header handleSetSidebar={handleSetSidebar} />)

    const toggleButton = screen.getByRole('button', { name: '' })
    fireEvent.click(toggleButton)

    expect(handleSetSidebar).toHaveBeenCalledOnce()
  })
})
