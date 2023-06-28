import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Banner from '../components/Banner'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { slidesData } from "../components/SlidesData";

const Home = () => {

return (
    <div> 
        <Navbar />
        <Slider slides={slidesData} />
        
        <Footer/>
    </div>
  );

}
export default Home
