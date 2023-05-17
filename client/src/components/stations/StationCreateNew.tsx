import { useState } from 'react'
import { StationForm } from './StationForm'
import { StationFormFields } from '../../types/station'

interface Props {
  setShowModal: (value: boolean) => void
}

const StationCreate = ({ setShowModal }: Props) => {
  const handleSubmit = (values: StationFormFields) => {
    console.log(values)
  }
  return (
    <StationForm onSubmit={handleSubmit} onCancel={() => setShowModal(false)} />
  )
}

export default StationCreate
