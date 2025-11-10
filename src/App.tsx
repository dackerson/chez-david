import { useEffect, useRef, useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import WorldMap from './components/WorldMap'

import 'leaflet/dist/leaflet.css'

import type { OrderItem } from './components/OrderItem'
import DrSodaItem from './components/DrSodaItem'
import AppleItem from './components/AppleItem'
import BirthdayCakeItem from './components/BirthdayCakeItem'
import WorldFoodItem from './components/WorldFoodItem'

function App() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
  const [showCanvas, setShowCanvas] = useState(false)
  const [showWorldMap, setShowWorldMap] = useState(false)
  const [cakeBlob, setCakeBlob] = useState<Blob | null>(null);


  return (
    <>
      <div id='items-list'>
        <h2>Add to your order</h2>
        <div className="card">
          <DrSodaItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
          <AppleItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
          <BirthdayCakeItem setShowCanvas={setShowCanvas} />
          <WorldFoodItem setShowWorldMap={setShowWorldMap} />
        </div>
        <div>
          { showCanvas? <Canvas setShowCanvas={setShowCanvas} setCakeBlob={setCakeBlob} setCurrentOrder={setCurrentOrder} /> : null }
          { showWorldMap? <WorldMap setCurrentOrder={setCurrentOrder} /> : null }
        </div>
      </div>
      <div id='current-order'>
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <div>Empty</div>
        ) : (
          currentOrder.map(item => (
            <div key={item.name}>
              {item.name} — {item.quantity ? item.quantity : ''}
              {item.imageBlob ?
                <img src={ item.imageBlob ?  URL.createObjectURL(item.imageBlob) : '' }
                  alt={item.name} width={50} />
                : null}
            </div>
          ))
        )}
      </div>
      <div id="map"></div>
    </>
  )
}

export default App
