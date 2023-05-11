import { useQuery } from 'react-query'
import { fetchStationByID } from '../api/stationApi'
import Spinner from './common/Spinner'
import { StationDetails } from '../types/station'
import StationDetailsComponent from './StationDetailsComponent'
import { useState } from 'react'
import { MonthSelector } from './common/MonthSelector'
interface Props {
  stationID: number
}

const StationDetailsView = (props: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [dates, setDates] = useState<object | null>(null)
  const { stationID } = props

  const {
    data: station,
    isLoading,
    isError,
  } = useQuery<StationDetails>(['station', stationID, dates], () =>
    fetchStationByID(stationID, dates)
  )

  const handleSetChecked = () => {
    setIsChecked(() => !isChecked)
    setDates(null)
  }

  return (
    <div className="bg-gray-200 sticky bottom-0 ">
      {isError ? (
        <p className="text-red-900">
          There was a problem with fetching station
        </p>
      ) : null}
      <Spinner show={isLoading} delay={300} />
      {isChecked && <MonthSelector setDates={setDates} />}
      <label>
        <input
          checked={isChecked}
          onChange={handleSetChecked}
          type="checkbox"
        />
        Filter By Month
      </label>
      {station && <StationDetailsComponent station={station} />}
    </div>
  )
}

export default StationDetailsView
