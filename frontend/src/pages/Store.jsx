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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";


const theme = createTheme({
  typography: {
    body2: {
      color: '#ff0000', // This sets the text color for body2 typography variant to red
    },
  },
});

const Store = () => {
  const [errors, setErrors] = useState({});
  const [fieldError,setFieldError] = useState("");;
  const navigate = useNavigate();

  const [Items, setItems] = useState([]);

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("categoryId");
  console.log(categoryId);
  useEffect(() => {
    const fetchItems = async () => {
      if(categoryId){
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/products/category?id=${categoryId}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              console.log(response.data);
              setItems(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
          
        } catch (error) {
          console.log(error);
        }

      }else{

        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/products`
          );
          setItems(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }

      }
     
    };
    fetchItems();
  }, [categoryId]);
  

  

return (
  <ThemeProvider theme={theme}>
    <div> 
      
        {fieldError && (
              <Typography variant="body2" color="error" align="center">
                {fieldError}
              </Typography>
            )}
        <Products items={Items}/>
        <br/>
        <Newsletter/>
   
    </div>
    </ThemeProvider>
  );

}
export default Store
