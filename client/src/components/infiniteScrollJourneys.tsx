import { useInfiniteQuery } from 'react-query'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import {
  JourneysDataWithCursor,
  fetchJourneysByCursor,
} from '../api/journeysApi'
import JourneyTable from './JourneyTable'
import useQueryParams from '../hooks/useQueryParams'

const InfiniteScrollJourneys = () => {
  const { queryParams } = useQueryParams()
  const { ref: loadMoreRef, inView } = useInView()
  const [search_field] = useState<string>('Departure_station_name')
  const [search, setSearch] = useState<string>('')
  //const [order] = useState<string[]>(['Departure_station_name', 'ASC'])
  // const [limit] = useState<number>(20)
  console.log(queryParams)
  const {
    data: journeys,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<JourneysDataWithCursor>(
    ['journeys', queryParams.search],
    ({ pageParam = 0 }) =>
      fetchJourneysByCursor(
        pageParam,
        queryParams.limit,
        search,
        search_field,
        queryParams.order
      ),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor
      },
    }
  )

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])
  const rows = journeys?.pages.flatMap((page) => page.rows) ?? []
  return (
    <div>
      <label>
        Search Journey:
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="max-h-auto overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching journeys
          </p>
        ) : null}
        {isLoading ? <p>Fetching journeys</p> : null}
        {isSuccess && (
          <div>
            <JourneyTable data={rows} /> <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollJourneys
