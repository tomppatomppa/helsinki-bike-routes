import { useQuery } from 'react-query'
import { fetchStationByID } from '../api/stationApi'

interface Props {
  stationID: number
}

const StationDetailsView = (props: Props) => {
  const { stationID } = props
  const { data: station } = useQuery(['station', stationID], () =>
    fetchStationByID(stationID)
  )

  return <div>StationDetailsView {station?.Nimi}</div>
}

export default StationDetailsView
