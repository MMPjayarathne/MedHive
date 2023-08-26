import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button,TextField } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RatingStars from '../components/RatingStars';

const ProductImage = styled('img')({
  maxWidth: '100%',
});

const CustomContainer = styled(Container)({
    paddingTop: '60px',
  });

  const CustomTextField = styled(TextField)({
    width: '100px', // Adjust the width as needed
  });
  
  

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const location = useLocation();
    const [quantity, setQuantity] = useState(1); 
    const defaultProductId = "64bc2c3f647893e862894de3";
    const URLproductId = new URLSearchParams(location.search).get("productId");
    const [token] = useState(Cookies.get('token') || '');
    const productId = URLproductId || defaultProductId
    const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    console.log(productId);

    const handleAddToCart = async (item,quantity) =>{
      try{
            if (item) {
              const productId = item;
              const productQuntity = quantity;
              const response = await axios.post(
                'http://localhost:8080/api/v1/cart/addCart',
                {
                  productId: productId,
                  quantity: productQuntity,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 200) {
                console.log('Success adding the item');
                window.location.href = `/cart`;
              } else {
                console.log('There is an error in adding the item');
              }
            }
            
          }catch(error){
            console.log("The error: ",error);
          }

    };

   
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/products/${productId}`);
          setProduct(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching product:', error);
        }finally {
            setLoading(false); // Set loading to false once fetching is done (success or error)
          }
      };

  
      fetchProduct();
    }, [productId]);

    const handleIncrement = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };
  
    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(prevQuantity => prevQuantity - 1);
      }
    };

    const productType = product? product.Type : null

    const handleShowPrescriptionForm = () => {
      setShowPrescriptionForm(true);
    };
  
    const handleBuyWithPrescription = () => {
      // You can add your logic here to handle the buy action with prescription
      // For example, you can send the prescriptionFile to the server
      console.log('Buy with prescription', prescriptionFile);
    };
    const [selectedFileName, setSelectedFileName] = useState('');

    const handlePrescriptionFileChange = (event) => {
      const file = event.target.files[0];
      setPrescriptionFile(file);
      setSelectedFileName(file ? file.name : '');
    };
  
    
  return (
    <CustomContainer maxWidth="lg">
      <Paper sx={{ p: 3 }} elevation={3}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        {loading ? (
              <ThreeDots color="#00BFFF" height={80} width={80} />
            ) : (
              <ProductImage src={product ? "http://localhost:8080/" + product.Image1.replace(/\\/g, "/") : ''} alt="Product" />
            )}
        </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
                     {product ? product.Name : 'Loading...'} 
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product ? product.Description : 'Loading...'}
            </Typography>
            <Grid container alignItems="center"  justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {product ? `Price: Rs ${product.Price}/=` : 'Loading...'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h7" gutterBottom>
                  Rating: {product ? <RatingStars rating={product.Rating} /> : 'Loading...'}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h7" gutterBottom>
             {product ? `Brand: ${product.Brand}` : 'Loading...'}
            </Typography><br/>
            <Typography variant="h7" gutterBottom>
              {product ? `Type: ${product.Type}` : 'Loading...'}
            </Typography><br/><br/>
            <Grid container alignItems="center" spacing={1}>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleIncrement}>
                  +
                </Button>
              </Grid>
              <Grid item>
                <CustomTextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(event) => setQuantity(parseInt(event.target.value, 10))}
                  inputProps={{ min: 1 }}
                />
              </Grid>
              
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleDecrement}>
                  -
                </Button>
              </Grid>
            </Grid>
            <br/>

            {productType==="OTC"?(
              
              <Grid container alignItems="center"  justifyContent="space-between">
                {
                  product.Quantity == 0?(

                    <>
                    <Typography variant="h7" style={{color:"red"}} gutterBottom>
                    Out Of Stock
                    </Typography><br/>
                    <Grid item>
                    <Button variant="contained" color="primary">
                      Add to Wish List
                    </Button>
                  </Grid>
                  </>

                  ):(
                    <>
                    <Grid item>
                    <Button onClick = {()=>{handleAddToCart(product._id,quantity)}} variant="contained" color="primary">
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item>
                  <Button variant="contained" color="primary">
                      Buy
                    </Button>
                    </Grid>
                    </>
                  )
                }
                 
            </Grid>
            ):(
              
            <Grid container alignItems="center"  justifyContent="space-between">
            <Grid item>
               <Button onClick = {()=>{handleAddToCart(product._id,quantity)}} variant="contained" color="primary">
                 Add to Cart
               </Button>
             </Grid>
             <Grid item>
             <Button variant="contained" color="primary" onClick={handleShowPrescriptionForm}>
              Enter Prescription
            </Button>
               </Grid>
          </Grid>
          
            )}
            <br/><br/>
            {/* Prescription form */}
            {showPrescriptionForm && (
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handlePrescriptionFileChange}
                />
                {selectedFileName && (
                  <p>Selected File: {selectedFileName}</p>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBuyWithPrescription}
                >
                  Buy
                </Button>
              </Grid>
            )}
            
          </Grid>
        </Grid>
      </Paper>
    </CustomContainer>
  );
};

export default ProductPage;
