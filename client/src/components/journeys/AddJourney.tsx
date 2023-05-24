import { useMutation, useQuery } from 'react-query'
import { AddJourneyForm } from './AddJourneyForm'
import { getAllStationNames } from '../../api/stationApi'
import { StationNameAndID } from '../../types/station'
import { createJourney } from '../../api/journeysApi'
import CloseButton from '../common/CloseButton'
import ErrorMessage from '../common/ErrorMessage'

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
      <ErrorMessage
        show={isError}
        text="There was a problem with adding journey"
      />
      {isSuccess && (
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-green-200 p-2">Succesfully added journey</div>
        </div>
      )}
      <div className="absolute top-0 right-0">
        <CloseButton onClick={() => setShowModal(false)} />
      </div>
      <AddJourneyForm
        stations={stations || []}
        onCancel={() => setShowModal(false)}
        onSubmit={sendJourneyForm}
      />
    </div>
  )
}

export default AddJourney
