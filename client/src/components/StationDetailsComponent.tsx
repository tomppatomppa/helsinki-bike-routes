import { StationDetails } from '../types/station'

interface Props {
  station: StationDetails
}

const StationDetailsComponent = (props: Props) => {
  const { Nimi, Namn, Name, Osoite, Adress, departures_count, returns_count } =
    props.station

  return (
    <div
      className="p-4 bg-neutral-100
                text-neutral-600 border border-black flex flex-col"
    >
      <div className="flex justify-center bg-neutral-100 w-full"></div>
      <div>
        <strong>STATION DETAILS</strong>
        <p>
          <strong>Names:</strong> {Nimi}, {Namn}, {Name}
        </p>
        <p>
          <strong>Adress:</strong> {Osoite}, {Adress}
        </p>
        <p>
          <strong>Departures from station: {departures_count} </strong>
        </p>
        <p>
          <strong>Returns to station: {returns_count}</strong>
        </p>
      </div>
    </div>
  )
}

export default StationDetailsComponent
