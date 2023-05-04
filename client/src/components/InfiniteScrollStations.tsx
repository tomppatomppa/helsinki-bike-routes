import { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'

const InfiniteScrollStations = () => {
  const { ref: loadMoreRef, inView } = useInView()
  const [limit] = useState<number>(10)

  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<StationDataWithCursor>(
    'stations',
    ({ pageParam = 0 }) => fetchStationsByCursor(pageParam, limit),
    {
      getNextPageParam: (lastPage, pages) => {
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
      <div className="max-h-full overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching stations
          </p>
        ) : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isSuccess && (
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
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
