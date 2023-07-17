import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Banner from '../components/Banner'
import Products from "../components/Products";
import Newsletter from '../components/Newsletter'
import Categories from '../components/Categories'
import {items} from '../components/Items'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { slidesData } from "../components/SlidesData";


const Store = () => {



  

return (
    <div> 
        <Navbar />
        <Products items={items}/>
        <br/>
        <Newsletter/>
        <Footer/>
    </div>
  );

}
export default Store
