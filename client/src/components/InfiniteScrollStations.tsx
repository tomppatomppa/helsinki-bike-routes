import { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'

import StationTable from './StationTable'
import useQueryParams from '../hooks/useQueryParams'

const InfiniteScrollStations = () => {
  const { queryParams, setSearch } = useQueryParams()
  const { ref: loadMoreRef, inView } = useInView()

  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<StationDataWithCursor>(
    ['stations', queryParams.search],

    ({ pageParam = 0 }) =>
      fetchStationsByCursor(
        pageParam,
        queryParams.limit,
        queryParams.search,
        queryParams.search_field
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

  const rows = stations?.pages.flatMap((page) => page.rows) ?? []

  return (
    <div>
      <label>
        Search Stations:
        <input
          value={queryParams.search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
