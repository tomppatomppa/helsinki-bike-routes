import { StationDetails } from '../types/station'

interface Props {
  station: StationDetails
}
const StationDetailsComponent = (props: Props) => {
  const { Nimi, Namn, Name, Osoite, Adress, departures_count, returns_count } =
    props.station

  return (
    <div>
      <p> {Nimi}</p>
      <p> {Namn}</p>
      <p> {Name}</p>
      <p> {Osoite}</p>
      <p> {Adress}</p>
      <p> {departures_count}</p>
      <p> {returns_count}</p>
    </div>
  )
}

export default StationDetailsComponent
