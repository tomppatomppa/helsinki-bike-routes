import { renderHook, act } from '@testing-library/react-hooks'
import { describe, expect, test } from 'vitest'

import useQueryParams, { SearchField } from '../hooks/useQueryParams'
import { JourneyTableColumns } from '../types/journey'

const departureStationName = 'Departure_station_name' as JourneyTableColumns
const findByFieldNimi = 'Name' as SearchField
const findByFieldOsoite = 'Osoite' as SearchField

describe('useQueryParams hook', () => {
  test('Should start with limit 50 by default', () => {
    const { result } = renderHook(() => useQueryParams())
    expect(result.current.queryParams.limit).toBe(50)
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
      result.current.orderByColumn(departureStationName)
    })
    expect(result.current.queryParams.order).toEqual([
      departureStationName,
      'ASC',
    ])
    act(() => {
      result.current.orderByColumn(departureStationName)
    })
    expect(result.current.queryParams.order).toEqual([
      departureStationName,
      'DESC',
    ])
  })
  test('Should reset order to ASC when column changes', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.orderByColumn(departureStationName)
    })
    expect(result.current.queryParams.order).toEqual([
      departureStationName,
      'ASC',
    ])
    act(() => {
      result.current.orderByColumn(departureStationName)
    })
    expect(result.current.queryParams.order).toEqual([
      departureStationName,
      'DESC',
    ])
  })
  test('Should set search_field', () => {
    const { result } = renderHook(() => useQueryParams())

    act(() => {
      result.current.findByField(findByFieldOsoite)
    })
    expect(result.current.queryParams.search_field).toEqual(findByFieldOsoite)
  })
  test('Setting search_field resets search value', () => {
    const { result } = renderHook(() => useQueryParams())
    act(() => {
      result.current.findByField(findByFieldOsoite)
      result.current.setSearch('Haka')
      result.current.findByField(findByFieldNimi)
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
