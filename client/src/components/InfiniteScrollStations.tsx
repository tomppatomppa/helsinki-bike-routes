import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { StationDataWithCursor, fetchStationsByCursor } from '../api/stationApi'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import StationTable from './StationTable'
import useQueryParams from '../hooks/useQueryParams'
import Dropdown from './common/Dropdown'
import Map from './Map'
import { LatLngTuple } from 'leaflet'
import { Station } from '../types/station'

const InfiniteScrollStations = () => {
  const [showMap, setShowMap] = useState<boolean>(true)
  const [station, setStation] = useState<Station | null>(null)
  //TODO: set initial search field to something
  const { queryParams, setSearch, findByField } = useQueryParams()
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

  const allStationCoordinates: LatLngTuple[] = rows.map((station) => {
    return [station.y, station.x]
  })

  return (
    <div className="flex flex-col">
      {showMap && (
        <Map allStationCoordinates={allStationCoordinates} station={station} />
      )}
      <button
        onClick={() => setShowMap(!showMap)}
        className="self-start border p-2 bg-orange-300"
      >
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
      <Dropdown
        title="Search by"
        options={['Nimi', 'Name', 'Namn', 'Osoite', 'Adress']}
        value={queryParams.search_field}
        onSelect={findByField}
      />
      <label>
        Search Stations:
        <input
          disabled={!queryParams.search_field}
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
            <StationTable data={rows} onClick={setStation} />
            <div ref={loadMoreRef}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollStations
