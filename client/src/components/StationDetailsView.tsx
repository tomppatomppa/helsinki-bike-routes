import { useQuery } from 'react-query'
import { fetchStationByID } from '../api/stationApi'
import Spinner from './Spinner'
import { StationDetails } from '../types/station'
import StationDetailsComponent from './StationDetailsComponent'

interface Props {
  stationID: number
  setStationID: (value: null) => void
}

const StationDetailsView = (props: Props) => {
  const { stationID, setStationID } = props
  const {
    data: station,
    isLoading,
    isError,
  } = useQuery<StationDetails>(['station', stationID], () =>
    fetchStationByID(stationID)
  )

  return (
    <div className="bg-gray-200 sticky bottom-0 w-full">
      {isError ? (
        <p className="text-red-900">
          There was a problem with fetching station
        </p>
      ) : null}
      {stationID && (
        <button className="text-xl" onClick={() => setStationID(null)}>
          Close
        </button>
      )}
      <Spinner show={isLoading} delay={300} />
      {station && <StationDetailsComponent station={station} />}
    </div>
  )
}

export default StationDetailsView
