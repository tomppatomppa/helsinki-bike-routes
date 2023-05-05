import React from 'react'
import { StationDetails } from '../types/station'

interface Props {
  props: StationDetails
}

const StationDetails: React.FC<Props> = (props) => {
  const { Nimi, Namn, Name, Osoite, Adress, departures_count, returns_count } =
    props
  return <div>StationDetails</div>
}

export default StationDetails
