import { StationDetails } from '../types/station'

interface Props {
  station: StationDetails
}

const StationDetailsComponent = (props: Props) => {
  const {
    Nimi,
    Namn,
    Name,
    Osoite,
    Adress,
    departures_count,
    returns_count,
    average_distance_departures,
    average_distance_returns,
    most_common_return_stations,
    most_common_departure_stations,
  } = props.station

  return (
    <div
      className="p-4 bg-neutral-100
                text-neutral-600 border border-black flex flex-col gap-2"
    >
      <div className="self-center text-xl">
        <strong>STATION DETAILS</strong>
      </div>
      <div className="flex flex-row w-full mx-auto gap-4 justify-evenly">
        <div>
          <p>
            <strong>Names:</strong> {Nimi}, {Namn}, {Name}
          </p>
          <p>
            <strong>Adress:</strong> {Osoite}, {Adress}
          </p>
          <p>
            <strong>Departures from station:</strong> {departures_count}
          </p>
          <p>
            <strong>Returns to station: </strong>
            {returns_count}
          </p>
          <p>
            <strong>Avg. distance for departures (m): </strong>
            {average_distance_departures | 0}
          </p>
          <p>
            <strong>Avg. distance for returns (m):</strong>
            {average_distance_returns | 0}
          </p>
        </div>
        <div>
          <p>
            <strong>Top 5 return stations for journey:</strong>
            {most_common_return_stations?.map((item) => (
              <li>{item}</li>
            ))}
          </p>
        </div>
        <div>
          <p>
            <strong>Top 5 return stations for journey:</strong>
            {most_common_departure_stations?.map((item) => (
              <li>{item} </li>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StationDetailsComponent
