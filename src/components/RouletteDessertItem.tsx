import React from 'react'
import type {OrderItem} from './OrderItem.tsx'

type RouletteDessertItemProps = {
  setShowRoulette: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RouletteDessertItem({ setShowRoulette }: RouletteDessertItemProps) {
    function onClick() {
        console.log('Showing Roullette wheel'); 
        setShowRoulette(true);
    }
    return (
        <>
        <div>  
            <button onClick={onClick}>Add</button>
            <span>Roulette Dessert</span>
        </div>
        </>
    )
}
