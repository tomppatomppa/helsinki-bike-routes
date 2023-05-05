import { useQuery } from 'react-query'
import { fetchStationByID } from '../api/stationApi'
import Spinner from './Spinner'

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
  if (isError) return <div>Cannot get station....</div>

  return (
    <div className="mt-24 bg-gray-200">
      <Spinner show={isLoading} delay={300} />
      {station && <StationDetailsComponent station={station} />}
    </div>
  )
}

export default StationDetailsView
