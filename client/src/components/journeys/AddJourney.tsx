import { AddJourneyForm } from './AddJourneyForm'

interface AddJourneyProps {
  setShowModal: (value: boolean) => void
}
const AddJourney = ({ setShowModal }: AddJourneyProps) => {
  return (
    <AddJourneyForm
      onCancel={() => setShowModal(false)}
      onSubmit={(values) => console.log(values)}
    />
  )
}

export default AddJourney
