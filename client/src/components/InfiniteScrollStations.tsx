import { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'

import StationTable from './StationTable'

const InfiniteScrollStations = () => {
  const { ref: loadMoreRef, inView } = useInView()
  const [search_field] = useState<string>('Name')
  const [search, setSearch] = useState<string>('')
  const [limit] = useState<number>(20)

  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<StationDataWithCursor>(
    ['stations', search],

    ({ pageParam = 0 }) =>
      fetchStationsByCursor(pageParam, limit, search, search_field),
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

  const rows = stations?.pages.flatMap((page) => page.rows) ?? []

  return (
    <div>
      <label>
        Search Stations:
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="max-h-[80vh] w-full overflow-auto divide-y p-6">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching stations
          </p>
        ) : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isSuccess && (
          <div>
            <StationTable data={rows} />
            <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
