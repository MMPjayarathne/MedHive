import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import SignIn from "./pages/SignIn.jsx";
import Register from "./pages/Register.jsx";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/ShoppingCart';
import Store from './pages/Store';
import SingleProduct from './pages/SingleProduct';
import Order from './pages/Order.jsx';
import OrderConfirm from './pages/OrderSuccessful';
import OrderReceived from './pages/OrderReceived';
import { isAdmin } from './utils/handleToken';
import NavBar from './admin/admin_component/NavBar';
import Users from './admin/admin_component/pages/Users';
import Products from './admin/admin_component/pages/Products';
import Categories from './admin/admin_component/pages/Categories';
import Orders from './admin/admin_component/pages/Orders';

const MainContent = ({ isUserAdmin }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderSuccessful" element={<OrderConfirm />} />
        <Route path="/orderReceived" element={<OrderReceived />} />
        </Routes>
        {isUserAdmin && (
          <div style={{ display: 'flex' }}>
                  <NavBar />
                  <div style={{ flex: 1, padding: '20px' }}>
                  <Routes>
                      <Route path="/admin/users" element={<Users />} />
                      <Route path="/admin/products" element={<Products />} />
                      <Route path="/admin/categories" element={<Categories />} />
                      <Route path="/admin/orders" element={<Orders />} />
                      <Route path="/admin" element={<Users />} /> {/* Default route */}
                  </Routes>
                  </div>
                </div>
        )}
      
      {!isAdminRoute && <Footer />}
    </>
  );
};

const RouterDOM = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      setIsUserAdmin(true);
    }
  }, []);

  return (
    <Router>
      <MainContent isUserAdmin={isUserAdmin} />
    </Router>
  );
};

export default RouterDOM;
