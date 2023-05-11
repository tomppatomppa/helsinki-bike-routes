import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import StationTable from './StationTable'
import useQueryParams from '../hooks/useQueryParams'
import Map from './Map'
import { LatLngTuple } from 'leaflet'
import { Station } from '../types/station'
import SearchBar from './common/SearchBar'

const InfiniteScrollStations = () => {
  const [showMap, setShowMap] = useState<boolean>(true)
  const [station, setStation] = useState<Station | null>(null)

  const { queryParams, setSearch, findByField } = useQueryParams()
  const {
    data: stations,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<StationDataWithCursor>(
    ['stations', queryParams.search, queryParams.search_field],
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

  const handleSelectStation = (station: Station) => {
    setShowMap(true)
    setStation(station)
  }

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const rows = stations?.pages.flatMap((page) => page.rows) ?? []

  const allStationCoordinates: LatLngTuple[] = rows.map((station) => {
    return [station.y, station.x]
  })

  return (
    <div className="flex flex-col overflow-hidden">
      {showMap && (
        <div className="z-0">
          <Map
            allStationCoordinates={allStationCoordinates}
            station={station}
          />
        </div>
      )}
      <div className="self-start">
        <button
          onClick={() => setShowMap(!showMap)}
          className="border p-2 bg-orange-300"
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
        {station && (
          <button
            onClick={() => setStation(null)}
            className="border p-2 bg-red-300"
          >
            Deselect
          </button>
        )}
      </div>
      <SearchBar
        options={['Nimi', 'Name', 'Namn', 'Osoite', 'Adress']}
        {...queryParams}
        findByField={findByField}
        setSearch={setSearch}
      />

      <div className="max-h-[80vh] w-full overflow-auto divide-y p-6">
        {isError ? (
          <p className="text-red-900">
            There was a problem with fetching stations
          </p>
        ) : null}
        {isLoading ? <p>Fetching stations</p> : null}
        {isSuccess && (
          <div>
            <StationTable data={rows} onClick={handleSelectStation} />
            {hasNextPage && <div ref={loadMoreRef}></div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
