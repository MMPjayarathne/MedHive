import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx"
import Register from "./pages/Register.jsx"
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/ShoppingCart'
import Store from './pages/Store'
import SingleProduct from './pages/SingleProduct';
import Order from './pages/Order.jsx';
import OrderConfirm from './pages/OrderSuccessful';
import OrderReceived from './pages/OrderReceived';

const RouterDOM = () => {
  return (
    
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
			<Route path="/signin" element={<SignIn/>}/>
			<Route path="/signup" element={<Register/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/product" element={<SingleProduct/>}/>
      <Route path="/order" element={<Order/>}/>
      <Route path='/orderSuccessful' element={<OrderConfirm/>}/>
      <Route path='/orderReceived' element={<OrderReceived/>}/>
      
     
      </Routes>
      <Footer/>
      </Router>
  );
  }

  export default RouterDOM;
