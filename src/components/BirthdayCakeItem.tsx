import React from 'react'

type BirthdayCakeItemProps = {
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BirthdayCakeItem({ setShowCanvas }: BirthdayCakeItemProps) {
    function onClick() {
        console.log('Showing canvas for Birthday Cake decoration')
        setShowCanvas(true);
    }
    return (
        <div>
            <button onClick={onClick}>Add</button>
            <span>Birthday Cake</span>
        </div>
    )
}
