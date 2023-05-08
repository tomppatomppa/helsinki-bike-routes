import { useState } from 'react'
const useQueryParams = () => {
  const [limit, setLimit] = useState<number>(0)

  const queryParams = { limit }
  return { queryParams }
}

export default useQueryParams
