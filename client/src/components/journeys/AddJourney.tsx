import { useMutation, useQuery } from 'react-query'
import { AddJourneyForm } from './AddJourneyForm'
import { getAllStationNames } from '../../api/stationApi'
import { StationNameAndID } from '../../types/station'

interface AddJourneyProps {
  setShowModal: (value: boolean) => void
}
const AddJourney = ({ setShowModal }: AddJourneyProps) => {
  const { data: stations } = useQuery<StationNameAndID[]>(
    ['stationNames'],
    () => getAllStationNames()
  )

  return (
    stations && (
      <AddJourneyForm
        stations={stations}
        onCancel={() => setShowModal(false)}
        onSubmit={(values) => console.log(values)}
      />
    )
  )
}

export default AddJourney
