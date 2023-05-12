import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import FileDetails from '../components/uploadFile/FileDetails'

describe('FileDetails.tsx', () => {
  const file = new File(['hello'], 'hello.csv', { type: 'text/csv' })

  const props = {
    handleSend: vi.fn(),
    handleRemove: vi.fn(),
    file: file,
  }

  test('Display error message when filetype is null', () => {
    const { getByText } = render(<FileDetails fileType={null} {...props} />)
    const errorMessage = getByText(/The file doesn't contain required headers/i)
    expect(errorMessage).toBeDefined()
  })
  test('HandleRemove gets been called when pressed', () => {
    const { getByRole } = render(<FileDetails fileType={null} {...props} />)
    const removeButton = getByRole('button')

    fireEvent.click(removeButton)

    expect(props.handleRemove).toHaveBeenCalledOnce()
    props.handleRemove.mockReset()
  })
  test('Component displays file name and filetype', () => {
    const { getByText } = render(
      <FileDetails fileType={'stations'} {...props} />
    )

    const filename = getByText('Filename: hello.csv')
    const filetype = getByText('stations')

    expect(filename).toBeDefined()
    expect(filetype).toBeDefined()
  })
  test('Upload button fires handleSend', () => {
    const { getByRole } = render(
      <FileDetails fileType={'stations'} {...props} />
    )
    const uploadButton = getByRole('button', {
      name: 'Upload',
    })
    fireEvent.click(uploadButton)

    expect(props.handleSend).toHaveBeenCalledOnce()
  })
})
