import { useQuery } from 'react-query'
import { fetchStationByID } from '../../api/stationApi'
import Spinner from '../common/Spinner'
import { StationDetails } from '../../types/station'
import { useState } from 'react'
import { MonthSelector } from '../common/MonthSelector'
import Checkbox from '../common/Checkbox'
import StationDetailsComponent from './StationDetailsComponent'
import ErrorMessage from '../common/ErrorMessage'

interface Props {
  stationID: number
}

const StationDetailsView = (props: Props) => {
  const { stationID } = props
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [dates, setDates] = useState<object | null>(null)

  const {
    data: station,
    isLoading,
    isError,
  } = useQuery<StationDetails>(['station', stationID, dates], () =>
    fetchStationByID(stationID, dates)
  )

  const handleResetChecked = () => {
    setIsChecked(() => !isChecked)
    setDates(null)
  }

  return (
    <div className="bg-gray-200 sticky bottom-0 h-54">
      <ErrorMessage
        show={isError}
        text=" There was a problem with fetching station"
      />
      {isChecked && <MonthSelector dates={dates} setDates={setDates} />}
      <Checkbox
        title="Filter By Month"
        checked={isChecked}
        onChange={handleResetChecked}
      />
      <Spinner show={isLoading} delay={300} />
      {station && <StationDetailsComponent station={station} />}
    </div>
  )
}

export default StationDetailsView
