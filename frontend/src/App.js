import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { BuyCatagory } from './pages/BuyCatagory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Support from './pages/Support';
import Footer from './components/footer/footer';  // capital F

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/buy" element={<BuyCatagory catagory="buy" />} />
            <Route path="/sell" element={<BuyCatagory catagory="sell" />} />
            <Route path="/rent" element={<BuyCatagory catagory="rent" />} />
            <Route path="/support" element={<Support />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;