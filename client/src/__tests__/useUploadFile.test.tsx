import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, test, vi } from 'vitest'
import useUploadFile from '../components/uploadFile/hooks/useUploadFile'

import { wrapper } from './config'

describe('useUploadFile.tsx hook', () => {
  test('renders hook', () => {
    const setFile = vi.fn()
    const { result } = renderHook(() => useUploadFile(setFile), { wrapper })
    expect(result.current).toBeDefined()
  })
  test('Should start with empty message', () => {
    const setFile = vi.fn()
    const { result } = renderHook(() => useUploadFile(setFile), { wrapper })

    expect(result.current.message).toBe('')
  })
})
