import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Navbar from './Components/Navbar/Navbar'
import ProductView from './Components/ProductView/ProductView'
import Checkout from './Pages/Checkout'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-9vw] '>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path='/checkout' element={<Checkout />} />

        </Routes>
    </div>
  )
}

export default App

