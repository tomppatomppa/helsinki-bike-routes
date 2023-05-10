import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, test } from 'vitest'
import useUploadFile from '../hooks/useUploadFile'

import { wrapper } from './config'

describe('useUploadFile.tsx hook', () => {
  test('test', () => {
    const { result } = renderHook(() => useUploadFile(), { wrapper })
    expect(result.current).toBeDefined()
  })
})
