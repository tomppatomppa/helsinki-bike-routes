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
const { Overlay } = LayersControl
import { LatLngExpression, LatLngTuple } from 'leaflet'
import { useRef } from 'react'
interface MapProps {
  allStationCoordinates: LatLngExpression[]
}

const initialPosition: LatLngTuple = [60.192059, 24.945831]

const Map = (props: MapProps) => {
  const { allStationCoordinates } = props
  const allStationsOverlayRef = useRef()

  return (
    <MapContainer
      className="w-screen h-96"
      center={initialPosition}
      zoom={10}
      scrollWheelZoom={true}
    >
      <LayersControl position="topright">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Overlay name="All station">
          <LayerGroup id="lg1" ref={allStationsOverlayRef}>
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
      </LayersControl>
    </MapContainer>
  )
}

export default Map
