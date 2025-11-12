import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './LocationMarker';
import type { OrderItem } from './OrderItem';

import worldDishes from './world-dishes'

type WorldMapProps = {
    setShowWorldMap: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentOrder?: React.Dispatch<React.SetStateAction<OrderItem[]>>
}

function addOrderToDish( lat: number, lng: number,
        setCurrentOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>) {
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&zoom=3`)
    .then(response => response.json()).then(data => {
        console.log('Reverse geocoding response data:')
        console.log(data)
        const countryCode = data?.address?.country_code;
        var worldDish = countryCode ? worldDishes[countryCode] : null;
        setCurrentOrder(prev => {
            var next = [...prev];
            next.push({ name: worldDish || "Bottle of Water", quantity: 1 });
            return next;
        })
    });
}

export default function WorldMap(worldMapProps: WorldMapProps) {
    const [location, setLocation] = React.useState<L.LatLng | null>(null);

    return (
        <>
      <MapContainer style={{ height: 500, width: 500 }} center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker location={location} setLocation={setLocation}/>
      </MapContainer>
      <button onClick={() => {
        if (!worldMapProps.setCurrentOrder) return;
        addOrderToDish(location?.lat ?? 0, location?.lng ?? 0, worldMapProps.setCurrentOrder);
        worldMapProps.setShowWorldMap(false);
      }}>
        Add a Dish From This Country to your Order
      </button>

        </>
    )
}