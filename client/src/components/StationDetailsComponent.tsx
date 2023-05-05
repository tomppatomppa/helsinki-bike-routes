import { StationDetails } from '../types/station'

interface Props {
  station: StationDetails
}

const StationDetailsComponent = (props: Props) => {
  const { Nimi, Namn, Name, Osoite, Adress, departures_count, returns_count } =
    props.station

  return (
    <div className="text-left">
      <div
        className="relative p-4 text-xl bg-neutral-100
                text-neutral-600 border border-black"
      >
        <strong>STATION DETAILS</strong>
        <p>
          <strong>Name:</strong> {Nimi}, {Namn}, {Name}
        </p>
        <p>
          <strong> Adress:</strong> {Osoite}, {Adress}
        </p>
        <p>
          <strong>Departures from station: {departures_count} </strong>
        </p>
        <p>
          <strong> Returns to station: {returns_count}</strong>
        </p>
      </div>
    </div>
  )
}

export default StationDetailsComponent
