import { useState, useEffect, Suspense, useDeferredValue } from 'react'
import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'

const InfiniteScrollStations = () => {
  const { ref: loadMoreRef, inView } = useInView()
  const [search_field] = useState<string>('Name')
  const [search, setSearch] = useState<string>('')
  const deferredQuery = useDeferredValue(search)
  const [limit] = useState<number>(20)

  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<StationDataWithCursor>(
    'stations',
    ({ pageParam = 0 }) =>
      fetchStationsByCursor(pageParam, limit, deferredQuery, search_field),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextCursor
      },
    }
  )
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuery])
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div>
      <label>
        Search Stations:
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="max-h-94 overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching stations
          </p>
        ) : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isSuccess && (
          <Suspense fallback={<h2>Loading...</h2>}>
            <div>
              {stations?.pages.map((data) => {
                return data.rows.map((station) => (
                  <div
                    className="relative p-4 text-xl border-l-4 bg-neutral-100
                text-neutral-600 border-neutral-500 "
                    key={station.ID}
                  >
                    {station.Name}
                  </div>
                ))
              })}
              <div ref={loadMoreRef}></div>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
