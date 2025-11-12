import React from 'react'
import { useMapEvents, Marker } from 'react-leaflet'
import L from 'leaflet'

type LocationMarkerProps = {
  location: L.LatLng | null
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng | null>>
}

export default function LocationMarker(locationMarkerProps: LocationMarkerProps) {
  useMapEvents({
    click(e) {
        locationMarkerProps.setLocation(e.latlng)
    }
  })

  return locationMarkerProps.location === null ? null : (
    <Marker position={locationMarkerProps.location}>
    </Marker>
  )
}