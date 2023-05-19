import { useState } from 'react'
import { StationTableColumns } from '../types/station'
import { JourneyTableColumns } from '../types/journey'

export type SearchField =
  | ''
  | StationTableColumns
  | JourneyTableColumns.Departure_station_name
  | JourneyTableColumns.Return_station_name
type OrderType = JourneyTableColumns
type Order = [OrderType, 'ASC' | 'DESC'] | []

const useQueryParams = () => {
  const [limit] = useState<number>(50)
  const [order, setOrder] = useState<Order>([])
  const [search, setSearch] = useState<string>('')
  const [search_field, setSearchField] = useState<SearchField>('')

  const orderByColumn = (value: OrderType) => {
    if (!value) return
    setOrder((prev) => {
      const isNewColumn = value === prev[0] ? false : true
      if (isNewColumn) return [value, 'ASC']
      return [value, prev[1] === 'ASC' ? 'DESC' : 'ASC']
    })
  }

  const findByField = (value: SearchField) => {
    setSearchField(value)
    setSearch('')
  }

  const queryParams = { limit, order, search, search_field }
  return { queryParams, orderByColumn, findByField, setSearch }
}

export default useQueryParams
