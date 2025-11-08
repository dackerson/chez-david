import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { OrderItem } from './components/OrderItem'
import DrSodaItem from './components/DrSodaItem'
import AppleItem from './components/AppleItem'

function App() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])

  return (
    <>
      <div id='items-list'>
        <h2>Add to your order</h2>
        <div className="card">
          <DrSodaItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
          <AppleItem currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
        </div>
      </div>
      <div id='current-order'>
        <h2>Current order</h2>
        {currentOrder.length === 0 ? (
          <div>Empty</div>
        ) : (
          currentOrder.map(item => (
            <div key={item.name}>{item.name} — {item.quantity}</div>
          ))
        )}
      </div>
    </>
  )
}

export default App
