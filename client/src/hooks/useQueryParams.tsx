import { useState } from 'react'
import { StationQueryParams } from '../types/station'
import { JourneyQueryParams } from '../types/journey'

type QueryParams = '' | StationQueryParams | JourneyQueryParams

const useQueryParams = () => {
  const [limit] = useState<number>(50)
  const [order, setOrder] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [search_field, setSearchField] = useState<QueryParams>('')

  const orderByColumn = (value: string | undefined) => {
    if (!value) return
    setOrder((prev) => {
      const isNewColumn = value === prev[0] ? false : true
      if (isNewColumn) return [value, 'ASC']
      return [value, prev[1] === 'ASC' ? 'DESC' : 'ASC']
    })
  }

  const findByField = (value: QueryParams) => {
    setSearchField(value)
    setSearch('')
  }

  const queryParams = { limit, order, search, search_field }
  return { queryParams, orderByColumn, findByField, setSearch }
}

export default useQueryParams
