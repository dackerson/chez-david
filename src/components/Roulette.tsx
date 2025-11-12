import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette-r19'
import rouletteData from './roulette-data'
import type { RouletteDataItem } from './roulette-data'
import type { OrderItem } from './OrderItem'

type RouletteProps = {
    setShowRoulette: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentOrder?: React.Dispatch<React.SetStateAction<OrderItem[]>>
}

export default function Roulette(rouletteProps: RouletteProps) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * rouletteData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  }

  const dessertMap: { [key: string]: string } = {
    'red': 'Red Velvet Cake',
    'black': 'Black Forest Cake',
    'green': 'Key Lime Pie'
  };

  const onStopSpinning = () => {
    if (!rouletteProps.setCurrentOrder) return;
    var prizeObj = rouletteData.find((item: RouletteDataItem) => item.option === prizeNumber.toString());
    if (!prizeObj) {
        console.log('No prize object found for option:', prizeNumber);
        return;
    }
    var dessert = dessertMap[prizeObj.style.backgroundColor]
    if (dessert) {
        rouletteProps.setCurrentOrder(prev => {
            var next = [...prev];
            next.push({name: dessert, quantity: 1 });
            return next;
        })
    }
    else {
        console.log('No dessert mapped for background color:', prizeObj.style.backgroundColor);
    }

    async function delayedHideRoulette(setShowRoulette : React.Dispatch<React.SetStateAction<boolean>>) {
        const sleep = (ms : number) => new Promise(r => setTimeout(r, ms));
        await sleep(2000);
        setShowRoulette(false);
    }
    // rouletteProps.setShowRoulette(false);
    delayedHideRoulette(rouletteProps.setShowRoulette);
    setMustSpin(false);
}

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={rouletteData}
        outerBorderColor={'#000000'}
        innerRadius={60}
        radiusLineColor={'#ffffffff'}
        radiusLineWidth={2}
        perpendicularText={true}
        textDistance={80}
        disableInitialAnimation={false}
        spinDuration={0.2}

        onStopSpinning={onStopSpinning}
      />
      <button onClick={handleSpinClick}>Pick a Dessert</button>
    </>
  )
}