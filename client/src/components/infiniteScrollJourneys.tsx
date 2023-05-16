import { useInfiniteQuery } from 'react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import {
  JourneysDataWithCursor,
  fetchJourneysByCursor,
} from '../api/journeysApi'

import JourneyTable from './JourneyTable'
import useQueryParams from '../hooks/useQueryParams'
import SearchBar from './common/SearchBar'

const InfiniteScrollJourneys = () => {
  const { queryParams, orderByColumn, findByField, setSearch } =
    useQueryParams()
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.25 })

  const {
    data: journeys,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<JourneysDataWithCursor>(
    ['journeys', queryParams.search, queryParams.order],
    ({ pageParam = 0 }) =>
      fetchJourneysByCursor(
        pageParam,
        queryParams.limit,
        queryParams.search,
        queryParams.search_field,
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
      <div className="min-h-auto overflow-y-auto divide-y">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching journeys
          </p>
        ) : null}
        {isLoading ? <p>Fetching journeys</p> : null}
        <SearchBar
          options={['Departure_station_name', 'Return_station_name']}
          {...queryParams}
          findByField={findByField}
          setSearch={setSearch}
        />
        {isSuccess && (
          <div>
            <JourneyTable data={rows} orderByColumn={orderByColumn} />
            <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollJourneys
