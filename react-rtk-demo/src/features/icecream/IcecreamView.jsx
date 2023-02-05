import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './icecreamSlice'

export const IcecreamView = () => {
    const numOfIcecream = useSelector(state => state.icecream.numOfIcecream)
    const dispatch = useDispatch()

    return (
        <div>
            <h2>Number Of Icecream - {numOfIcecream}</h2>
            <button onClick={() => dispatch(ordered())}> Order Icecream</button>
            <button onClick={() => dispatch(restocked(10))} > Restock Icecream</button>
        </div>
    )
}