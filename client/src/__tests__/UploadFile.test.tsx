import { describe, expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import UploadFile from '../components/UploadFile'
import userEvent from '@testing-library/user-event'
import { renderWithClient } from './config'

describe('UploadFile.tsx', () => {
  test('Renders upload button', async () => {
    renderWithClient(<UploadFile />)
    const uploadButton = await screen.findByTestId('upload-button')
    expect(uploadButton).toBeDefined()
  })
  test('upload csv file', async () => {
    renderWithClient(<UploadFile />)

    const fileInput = (await screen.findByTestId(
      'file-input'
    )) as HTMLInputElement

    const file = new File(['hello'], 'hello.csv', { type: 'text/csv' })

    await userEvent.upload(fileInput, file)

    expect(fileInput.files[0]).toBe(file)
    expect(fileInput.files.item(0)).toBe(file)
    expect(fileInput.files).toHaveLength(1)
  })

  test('input should not accept wrong type ', async () => {
    renderWithClient(<UploadFile />)
    const fileInput = (await screen.findByTestId(
      'file-input'
    )) as HTMLInputElement
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    await userEvent.upload(fileInput, file)
    expect(fileInput.files[0]).toBeFalsy()
  })

  test('Should not show upload or remove button', () => {
    renderWithClient(<UploadFile />)
    const uploadButton = screen.queryByText('Upload')
    const removeButton = screen.queryByText('Remove')
    expect(uploadButton).toBeNull()
    expect(removeButton).toBeNull()
  })

  test('Should show upload button and remove button', async () => {
    renderWithClient(<UploadFile />)

    const fileInput = (await screen.findByTestId(
      'file-input'
    )) as HTMLInputElement

    const file = new File(['hello'], 'hello.csv', { type: 'text/csv' })

    await userEvent.upload(fileInput, file)

    const uploadButton = screen.queryByText('Upload')
    const removeButton = screen.queryByText('Remove')

    expect(uploadButton).toBeDefined()
    expect(removeButton).toBeDefined()
  })
})
