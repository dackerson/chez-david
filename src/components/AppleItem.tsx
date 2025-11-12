import React from 'react'
import type {OrderItem} from './OrderItem.tsx'

type AppleItemProps = {
  setCurrentOrder?: React.Dispatch<React.SetStateAction<OrderItem[]>>
}

export default function AppleItem({ setCurrentOrder }: AppleItemProps) {
    function addItem(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!setCurrentOrder) return

        setCurrentOrder(prev => {
            console.log('Adding Apple to order')
            var next = [...prev]

            var value = next.find(item => item.name === 'Apple')
            if (value) {
                next = next.map(item =>
                    item.name === 'Apple'
                    ? { ...item, quantity: item.quantity! + 1 }
                    : item
                )
            }
            else {
                next.push({ name: 'Apple', quantity: 1 })
                var value = next.find(item => item.name === 'Dr. Soda')
                if (value) {
                    alert('Adding an Apple will remove Dr. Soda from your order.')
                }
                next = next.filter(item => item.name !== 'Dr. Soda')
            }
            return next
        })
    }
    return (
        <form onSubmit={addItem}>
            <button type="submit">Add</button>
            <span>Apple</span>
        </form>
    )
}
