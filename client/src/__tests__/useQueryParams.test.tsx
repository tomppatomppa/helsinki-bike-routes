import { renderHook } from '@testing-library/react-hooks'
import { describe, expect, test } from 'vitest'

import useQueryParams from '../hooks/useQueryParams'

describe('useQueryParams hook', () => {
  test('Should start with limit 0 by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.limit).toBe(0)
  })
})
