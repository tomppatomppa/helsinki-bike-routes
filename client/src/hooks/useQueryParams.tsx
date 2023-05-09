import { useState } from 'react'

const useQueryParams = () => {
  const [limit] = useState<number>(20)
  const [order, setOrder] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [search_field, setSearchField] = useState('')

  const orderByColumn = (value: string | undefined) => {
    if (!value) return
    setOrder((prev) => {
      const isNewColumn = value === prev[0] ? false : true
      if (isNewColumn) return [value, 'ASC']
      return [value, prev[1] === 'ASC' ? 'DESC' : 'ASC']
    })
  }

  const findByField = (value: string) => {
    setSearchField(value)
  }

  const queryParams = { limit, order, search, search_field }
  return { queryParams, orderByColumn, findByField, setSearch }
}

export default useQueryParams
