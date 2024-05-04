import { useState } from 'react'
import Header from './components/Header';
import Items from './components/Products/Items.tsx';
import Cart from './components/Cart/Cart.tsx';
import CartPopup from './components/Cart/CartPopup.tsx';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Cart />
      <Items />
      <CartPopup />
    </>
  )
}

export default App
