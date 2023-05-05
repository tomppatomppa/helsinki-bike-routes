import { useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'

import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'

interface Props {
  setStationID: (values: number) => void
}

const InfiniteScrollStations: React.FC<Props> = ({ setStationID }) => {
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

  return (
    <div>
      <label>
        Search Stations:
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="max-h-auto overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching stations
          </p>
        ) : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isSuccess && (
          <div>
            {stations?.pages.map((data) => {
              return data.rows.map((station) => (
                <div
                  onClick={() => setStationID(station.ID)}
                  className="relative p-4 text-xl border-l-4 bg-neutral-100
                text-neutral-600 border-neutral-500 cursor-pointer"
                  key={station.ID}
                >
                  {station.Name} {station.ID}
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
