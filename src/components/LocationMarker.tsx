import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useMapEvents, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type * as Leaflet from 'leaflet'

type LocationMarkerProps = {
  location: L.LatLng | null
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng | null>>
}

export default function LocationMarker(locationMarkerProps: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
        locationMarkerProps.setLocation(e.latlng)
    }
  })

  return locationMarkerProps.location === null ? null : (
    <Marker position={locationMarkerProps.location}>
    </Marker>
  )
}