import { useEffect, useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import {
  StationDataWithCursor,
  fetchStationsByCursor,
} from '../../api/stationApi'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import StationTable from './StationTable'
import useQueryParams from '../../hooks/useQueryParams'
import Map from '../map/Map'
import { Station } from '../../types/station'
import SearchBar from '../common/SearchBar'
import { useDebounce } from 'use-debounce'
import useDeleteStation from './hooks/useDeleteStation'

import { BsMap } from 'react-icons/bs'
import { HiOutlineMapPin } from 'react-icons/hi2'
import ErrorMessage from '../common/ErrorMessage'
import Spinner from '../common/Spinner'

const InfiniteScrollStations = () => {
  const [showMap, setShowMap] = useState<boolean>(true)
  const [station, setStation] = useState<Station | null>(null)
  const { mutate: deleteStation } = useDeleteStation()
  const { queryParams, setSearch, findByField } = useQueryParams()
  const [searchValue] = useDebounce(queryParams.search, 300)

  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<StationDataWithCursor>(
    ['stations', searchValue],
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

  const { ref: loadMoreRef, inView } = useInView({
    skip: !hasNextPage,
  })

  const handleSelectStation = useCallback((station: Station) => {
    setShowMap(true)
    setStation(station)
  }, [])

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const rows = stations?.pages.flatMap((page) => page.rows) ?? []

  return (
    <div className="flex flex-col overflow-hidden">
      {showMap && (
        <div className="z-0">
          <Map station={station} />
        </div>
      )}
      <div className="flex bg-secondary">
        <button
          onClick={() => setShowMap(!showMap)}
          className="border p-2 border-black bg-white flex items-center"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
          <BsMap className="ml-2" />
        </button>
        {station && (
          <button
            onClick={() => setStation(null)}
            className="border p-2 border-black bg-red-300 flex items-center"
          >
            Deselect
            <HiOutlineMapPin size={22} className="ml-2" />
          </button>
        )}
      </div>
      <SearchBar
        options={['Nimi', 'Name', 'Namn', 'Osoite', 'Adress']}
        {...queryParams}
        findByField={findByField}
        setSearch={setSearch}
      />
      <div className="min-h-[80vh] w-full overflow-auto divide-y p-6">
        <ErrorMessage
          show={isError}
          text="There was a problem with fetching stations"
        />
        <Spinner show={isLoading} delay={500} />
        {isSuccess && (
          <div
            className={`max-w-6xl mx-auto max-h-[20vh] ${
              isFetching && 'opacity-70'
            }`}
          >
            <StationTable
              data={rows}
              onClick={handleSelectStation}
              deleteStation={deleteStation}
            />
            <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
