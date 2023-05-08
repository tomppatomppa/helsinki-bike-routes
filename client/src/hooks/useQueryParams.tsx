import { useState } from 'react'
const useQueryParams = () => {
  const [offset, setOffset] = useState<number>(0)
  const [limit, setLimit] = useState<number>(20)
  const [order, setOrder] = useState<string[]>(['', ''])
  const [search, setSearch] = useState<string>('')
  const [search_field, setSearchField] = useState('')

  const orderByColumn = (value: string | undefined) => {
    if (!value) return
    setOrder((prev) => {
      const isNew = value === prev[0] ? false : true
      if (isNew) return [value, 'ASC']
      return [value, prev[1] === 'ASC' ? 'DESC' : 'ASC']
    })
  }

  const findByField = (value: string) => {
    setSearchField(value)
  }

  const queryParams = { limit, offset, order, search, search_field }
  return { queryParams, orderByColumn, findByField, setSearch }
}

export default useQueryParams
