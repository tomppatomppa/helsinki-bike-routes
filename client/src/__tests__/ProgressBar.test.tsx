import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import ProgressBar from '../components/common/ProgressBar'

describe('ProgressBar.tsx', () => {
  test('Should show zero decimals', () => {
    const value = 2.22424224
    const { getByText } = render(<ProgressBar value={value} />)
    const element = getByText('2%')
    expect(element).toBeDefined()
  })
})
