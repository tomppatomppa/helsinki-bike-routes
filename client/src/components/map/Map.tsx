import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngTuple } from 'leaflet'
import { greenIcon } from './icons'

import { Station } from '../../types/station'

interface MapProps {
  station: Station | null
}

const initialPosition: LatLngTuple = [60.192059, 24.945831]

const Map = (props: MapProps) => {
  const { station } = props

  return (
    <MapContainer
      className="h-96"
      center={initialPosition}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {station && (
        <Marker
          key={station.ID}
          icon={greenIcon}
          position={[station.y, station.x]}
        >
          <Popup>
            <span>{station.Name}</span>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default Map
