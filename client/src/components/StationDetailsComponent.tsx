import { StationDetails } from '../types/station'

interface Props {
  station: StationDetails
}
const StationDetailsComponent = (props: Props) => {
  const { Nimi, Namn, Name, Osoite, Adress, departures_count, returns_count } =
    props.station

  return (
    <div className="flex text-left h-full flex-1 ">
      <div
        className="relative p-4 text-xl bg-neutral-100 w-full
                text-neutral-600 border border-black"
      >
        <strong>STATION DETAILS</strong>
        <p>
          <strong>Name:</strong> {Nimi}, {Namn},{Name}
        </p>
        <p>
          <strong> Adress:</strong> {Osoite}, {Adress}
        </p>
        <p>
          <strong>Departures from station: </strong>
          {departures_count}
        </p>
        <p>
          <strong> Returns to station: </strong>
          {returns_count}
        </p>
      </div>
    </div>
  )
}

export default StationDetailsComponent
