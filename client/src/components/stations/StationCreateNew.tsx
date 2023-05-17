import { StationForm } from './StationForm'

import useCreateStation from './hooks/useCreateStation'

interface Props {
  setShowModal: (value: string | null) => void
}

const StationCreate = ({ setShowModal }: Props) => {
  const { sendStationForm, nextID } = useCreateStation(setShowModal)
  const handleSend = (value) => {
    console.log(value)
  }
  return (
    <StationForm
      nextAvailableID={nextID}
      onSubmit={handleSend}
      onCancel={() => setShowModal(null)}
    />
  )
}

export default StationCreate
