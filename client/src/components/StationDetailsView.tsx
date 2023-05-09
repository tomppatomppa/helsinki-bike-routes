import { useQuery } from 'react-query'
import { fetchStationByID } from '../api/stationApi'
import Spinner from './common/Spinner'
import { StationDetails } from '../types/station'
import StationDetailsComponent from './StationDetailsComponent'

interface Props {
  stationID: number
}

const StationDetailsView = (props: Props) => {
  const { stationID } = props
  const {
    data: station,
    isLoading,
    isError,
  } = useQuery<StationDetails>(['station', stationID], () =>
    fetchStationByID(stationID)
  )

  return (
    <div className="bg-gray-200 sticky bottom-0 ">
      {isError ? (
        <p className="text-red-900">
          There was a problem with fetching station
        </p>
      ) : null}
      <Spinner show={isLoading} delay={300} />
      {station && <StationDetailsComponent station={station} />}
    </div>
  )
}

export default StationDetailsView
