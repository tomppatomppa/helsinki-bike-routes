import { describe, test, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'

import UploadResults from '../../components/uploadFile/UploadResults'

const data = {
  key1: 'value1',
  key2: 'value2',
}
describe('UploadResults.tsx', () => {
  test('Renders correct number of items and content', () => {
    render(<UploadResults data={data} />)
    const list = screen.getByRole('list')
    const { getAllByRole } = within(list)
    const items = getAllByRole('listitem')

    expect(items).toHaveLength(2)
    expect(items[0].textContent).toContain(data.key1)
    expect(items[1].textContent).toContain(data.key2)
  })
})
