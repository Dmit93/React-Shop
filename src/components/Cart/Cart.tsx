import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

const Cart = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div>
            {cartItems.map((item) => {
                return (<li key={item.id}>{item.name}</li>)
            })}
        </div>
    )
}


export default Cart;