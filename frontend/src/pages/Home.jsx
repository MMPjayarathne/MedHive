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
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [errors, setErrors] = useState({});
  const [fieldError,setFieldError] = useState("");
  const navigate = useNavigate();
  const [Items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products`
        );
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);
return (
    <div> 
       
        <Slider slides={slidesData} />
        <Categories/>
        <Banner/>
        <Products items={Items}/>
        <br/>
        <Newsletter/>
       
    </div>
  );

}
export default Home
