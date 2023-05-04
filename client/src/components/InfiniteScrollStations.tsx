import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'

const InfiniteScrollStations = () => {
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
    ({ pageParam = 0 }) => fetchStationsByCursor(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextCursor
      },
    }
  )
  const fetchMore = () => {
    if (!isFetchingNextPage || hasNextPage) {
      fetchNextPage()
    }
  }
  return (
    <div>
      {isError ? (
        <p className="text-red-900">
          There was a problem with fetching stations
        </p>
      ) : null}
      {isLoading ? <p>Fetching stations</p> : null}
      {isSuccess && <button onClick={fetchMore}>fetch next</button>}
      {isLoading ? <p>Fetching stations</p> : null}
      {isSuccess && (
        <div>
          {stations?.pages.map((data) => {
            return data.rows.map((station) => (
              <div key={station.ID}>{station.Name}</div>
            ))
          })}
        </div>
      )}
    </div>
  )
}

export default InfiniteScrollStations
