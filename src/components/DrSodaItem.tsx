import React from 'react'
import type {OrderItem} from './OrderItem.tsx'

type DrSodaItemProps = {
  currentOrder: OrderItem[]
  setCurrentOrder?: React.Dispatch<React.SetStateAction<OrderItem[]>>
}

export default function DrSodaItem({ currentOrder, setCurrentOrder }: DrSodaItemProps) {
    function addItem(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!setCurrentOrder) return

        setCurrentOrder(prev => {
            console.log('Adding Dr. Soda to order')
            var next = [...prev]

            if (next.find(item => item.name === 'Apple')) {
                alert('You cannot order Dr. Soda with an Apple in your order.')
                return next
            }

            var value = next.find(item => item.name === 'Dr. Soda')
            if (value) {
                next = next.map(item =>
                    item.name === 'Dr. Soda'
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                )
            }
            else {
                next.push({ name: 'Dr. Soda', quantity: 1 })
            }
            return next
        })
    }
    return (
        <form onSubmit={addItem}>
            <button type="submit">Add</button>
            <span>Dr. Soda</span>
        </form>
    )
}
