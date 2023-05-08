import { Station } from '../types/station'

type StationListItemProps = {
  station: Station
  onClick: (value: number) => void
}

const StationListItem = ({ station, onClick }: StationListItemProps) => {
  return (
    <div
      onClick={() => onClick(station.ID)}
      className="flex gap-4 text-xl border bg-neutral-100
text-neutral-600 border-black cursor-pointer h-12 text-left items-center"
      key={station.ID}
    >
      <span>
        {station.Name},{station.Nimi},{station.Namn}
      </span>
      <span>{station.Osoite}</span>
      <span>{station.Adress}</span>
      <span>{station.Kaupunki}</span>
    </div>
  )
}

export default StationListItem
