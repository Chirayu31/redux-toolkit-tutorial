import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restock } from './cakeSlice'

export const CakeView = () => {
    const numOfCakes = useSelector((state) => state.cake.numOfCakes)
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Number Of Cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(ordered())}> Order Cake</button>
            <button onClick={() => dispatch(restock(5))}> Restock Cake</button>
        </div>
    )
}