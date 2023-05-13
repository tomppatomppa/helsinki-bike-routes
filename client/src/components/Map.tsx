import { useRef } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression, LatLngTuple } from 'leaflet'

const { Overlay } = LayersControl

import { Station } from '../types/station'

interface MapProps {
  allStationCoordinates: LatLngExpression[]
  station: Station | null
}

const initialPosition: LatLngTuple = [60.192059, 24.945831]

const Map = (props: MapProps) => {
  const { allStationCoordinates, station } = props

  const allStationsOverlayRef = useRef(null)
  const singleStationOverlayRef = useRef(null)

  const greenIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  return (
    <MapContainer
      className="h-96"
      center={initialPosition}
      zoom={10}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Overlay checked={!station} name="All stations">
          <LayerGroup attribution="lg1" ref={allStationsOverlayRef}>
            {allStationCoordinates?.map((coord, index) => (
              <Marker key={index} position={coord}>
                <Popup>
                  <span>
                    {index} A pretty CSS3 popup. <br /> Easily customizable.
                  </span>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </Overlay>
        <Overlay checked={station !== null} name="Selected Station">
          <LayerGroup attribution="single" ref={singleStationOverlayRef}>
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
          </LayerGroup>
        </Overlay>
      </LayersControl>
    </MapContainer>
  )
}

export default Map
