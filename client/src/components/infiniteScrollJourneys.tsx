import { useInfiniteQuery } from 'react-query'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import {
  JourneysDataWithCursor,
  fetchJourneysByCursor,
} from '../api/journeysApi'

const InfiniteScrollJourneys = () => {
  const { ref: loadMoreRef, inView } = useInView()
  const [search_field] = useState<string>('Departure_station_name')
  const [search, setSearch] = useState<string>('')
  const [order] = useState<string[]>(['Departure_station_name', 'ASC'])
  const [limit] = useState<number>(20)

  const {
    data: journeys,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<JourneysDataWithCursor>(
    ['journeys', search],
    ({ pageParam = 0 }) =>
      fetchJourneysByCursor(pageParam, limit, search, search_field, order),
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

  return (
    <div>
      <label>
        Search Journey:
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="max-h-64 overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching journeys
          </p>
        ) : null}
        {isLoading ? <p>Fetching journeys</p> : null}
        {isSuccess && (
          <div>
            {journeys?.pages.map((data) => {
              return data.rows.map((journey) => (
                <div
                  className="relative p-4 text-xl border-l-4 bg-neutral-100
                text-neutral-600 border-neutral-500 "
                  key={journey.id}
                >
                  {journey.Departure_station_name}
                </div>
              ))
            })}
            <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollJourneys
