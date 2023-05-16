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
      <div className="self-center ">
        <p>
          Names: {Nimi}, {Namn}, {Name}
        </p>
        <p>
          Adress: {Osoite}, {Adress}
        </p>
      </div>
      <div className="flex flex-row w-full mx-auto gap-4 justify-evenly">
        <div id="station-info">
          <strong>Station info:</strong>
          <p>Departures from station: {departures_count}</p>
          <p>Returns to station: {returns_count}</p>
          <p>
            Avg. distance for departures (m): {average_distance_departures | 0}
          </p>
          <p>Avg. distance for returns (m): {average_distance_returns | 0}</p>
        </div>
        <div id="station-avg-1">
          <strong>Top 5 return stations for journey:</strong>
          {most_common_return_stations?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
        <div id="station-avg-2">
          <strong>Top 5 departure stations for journey:</strong>
          {most_common_departure_stations?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StationDetailsComponent
