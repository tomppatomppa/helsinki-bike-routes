import { StationForm } from './StationForm'

import useCreateStation from './hooks/useCreateStation'

interface Props {
  setShowModal: (value: string | null) => void
}

const StationCreate = ({ setShowModal }: Props) => {
  const { sendStationForm, nextID } = useCreateStation(setShowModal)

  return (
    <StationForm
      nextAvailableID={nextID}
      onSubmit={sendStationForm}
      onCancel={() => setShowModal(null)}
    />
  )
}

export default StationCreate
