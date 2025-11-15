import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import WorldMap from './components/WorldMap'

import 'leaflet/dist/leaflet.css'
import Matter from 'matter-js'

import type { OrderItem } from './components/OrderItem'
import DrSodaItem from './components/DrSodaItem'
import AppleItem from './components/AppleItem'
import BirthdayCakeItem from './components/BirthdayCakeItem'
import WorldFoodItem from './components/WorldFoodItem'
import Roulette from './components/Roulette'
import RouletteDessertItem from './components/RouletteDessertItem'

function App() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
  const [showCanvas, setShowCanvas] = useState(false)
  const [showWorldMap, setShowWorldMap] = useState(false)
  const [showRoulette, setShowRoulette] = useState(false)
  const [_, setCakeBlob] = useState<Blob | null>(null);

//   var canvas = document.querySelector("canvas") as HTMLCanvasElement;
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// ctx.font = "30px Arial";
// ctx.fillStyle = "white";
// ctx.fillText("Hello World", 150, 150);

  return (
    <>
      <div id='items-list'>
        <h2>Add to your order</h2>
        <div className="card">
          <DrSodaItem setCurrentOrder={setCurrentOrder} />
          <AppleItem setCurrentOrder={setCurrentOrder} />
          <BirthdayCakeItem setShowCanvas={setShowCanvas} />
          <WorldFoodItem setShowWorldMap={setShowWorldMap} />
          <RouletteDessertItem setShowRoulette={setShowRoulette} />
        </div>
        <div>
          { showCanvas? <Canvas setShowCanvas={setShowCanvas} setCakeBlob={setCakeBlob} setCurrentOrder={setCurrentOrder} /> : null }
          { showWorldMap? <WorldMap setShowWorldMap={setShowWorldMap} setCurrentOrder={setCurrentOrder} /> : null }
          { showRoulette? <Roulette setShowRoulette={setShowRoulette} setCurrentOrder={setCurrentOrder} /> : null }
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
    </>
  )
}

export default App
