import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Navbar from './Components/Navbar/Navbar';
import ProductView from './Pages/Dinidu/ProductView';
import Checkout from './Pages/Checkout';
import Productadd from './Pages/Dinidu/Productadd';
import Productupdate from './Pages/Dinidu/Productupdate';
import Productlist from './Pages/Dinidu/Productlist';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center text-red-500">
          Something went wrong: {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/productlist" element={<Productlist />} />
          <Route path="/admin/products">
            <Route index element={<Productlist />} />
            <Route path="add" element={<Productadd />} />
            <Route path="edit/:id" element={<Productupdate />} />
            <Route path="view/:id" element={<ProductView />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;