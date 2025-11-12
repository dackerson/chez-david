import React from 'react'

type WorldFoodItemProps = {
  setShowWorldMap: React.Dispatch<React.SetStateAction<boolean>>
}

export default function WorldFoodItem({ setShowWorldMap }: WorldFoodItemProps) {
    function onClick() {
        console.log('Showing canvas for Birthday Cake decoration')
        setShowWorldMap(true);
    }
    return (
        <>
            <button onClick={onClick}>Add</button>
            <span>Something from anywhere in the world</span>
        </>
    )
}
