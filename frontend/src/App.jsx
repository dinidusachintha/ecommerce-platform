import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Navbar from './Components/Navbar/Navbar'
import ProductView from './Pages/Dinidu/ProductView'
import Checkout from './Pages/Checkout'
import Producadd from './Pages/Dinidu/Productadd'
import Productupdate from './Pages/Dinidu/Productupdate'



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

        <Route path='/productadd' element={<Producadd />} />
        <Route path='/productupdate' element={<Productupdate />} />
        



        </Routes>
    </div>
  )
}

export default App

