import { renderHook, act } from '@testing-library/react-hooks'
import { describe, expect, test } from 'vitest'

import useQueryParams from '../hooks/useQueryParams'

describe('useQueryParams hook', () => {
  test('Should start with limit 20 by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.limit).toBe(20)
  })

  test('Should start with order [] by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.order).toHaveLength(0)
  })
  test('Should start with search "" by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.search).toBe('')
  })
  test('Should start with search_field "" by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.search_field).toBe('')
  })
  test('Should set order to ASC and then DESC', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.orderByColumn('Name')
    })
    expect(result.current.queryParams.order).toEqual(['Name', 'ASC'])
    act(() => {
      result.current.orderByColumn('Name')
    })
    expect(result.current.queryParams.order).toEqual(['Name', 'DESC'])
  })
  test('Should reset order to ASC when column changes', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.orderByColumn('Nimi')
    })
    expect(result.current.queryParams.order).toEqual(['Nimi', 'ASC'])
    act(() => {
      result.current.orderByColumn('Name')
    })
    expect(result.current.queryParams.order).toEqual(['Name', 'ASC'])
  })
  test('Should set search_field', () => {
    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.findByField('Osoite')
    })
    expect(result.current.queryParams.search_field).toEqual('Osoite')
  })
  test('Setting search_field resets search value', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.findByField('Osoite')
      result.current.setSearch('Haka')
      result.current.findByField('Nimi')
    })
    expect(result.current.queryParams.search).toEqual('')
  })
  test('Should set search', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.setSearch('Haka')
    })
    expect(result.current.queryParams.search).toEqual('Haka')
  })
})
