import { useMutation, useQuery } from 'react-query'
import { AddJourneyForm } from './AddJourneyForm'
import { getAllStationNames } from '../../api/stationApi'
import { StationNameAndID } from '../../types/station'
import { createJourney } from '../../api/journeysApi'

interface AddJourneyProps {
  setShowModal: (value: boolean) => void
}

const AddJourney = ({ setShowModal }: AddJourneyProps) => {
  const { data: stations } = useQuery<StationNameAndID[]>(
    ['stationNames'],
    () => getAllStationNames()
  )
  const {
    mutate: sendJourneyForm,
    isError,
    isSuccess,
  } = useMutation(createJourney)

  return (
    <div className="relative bg-white flex rounded-md flex-col">
      {isError ? (
        <p className="text-red-900">There was a problem with adding journey</p>
      ) : null}
      {isSuccess && (
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-green-200 p-2">Succesfully added journey</div>
        </div>
      )}
      <AddJourneyForm
        stations={stations || []}
        onCancel={() => setShowModal(false)}
        onSubmit={sendJourneyForm}
      />
    </div>
  )
}

export default AddJourney
