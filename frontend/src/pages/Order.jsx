import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
import { MDBIcon} from 'mdbreact';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';

const CustomContainer = styled(Container)({
  paddingTop: '60px',
});

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentType, setPaymentType] = useState('credit'); // Default to credit card
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [token] = useState(Cookies.get('token') || '');
  const [items] = useState(Cookies.get('orders') || '');
  const [orderItems, setOrderItems] = useState(JSON.parse(items));
  const [errors, setErrors] = useState({});
  const [fieldError,setFieldError] = useState("")

  const cartItems = []; // Replace with your actual cart items
  const totalAmount = 0; // Replace with your actual total amount
console.log("Items",orderItems);

  const handlePlaceOrder = () => {
    const newErrors = {};

    if (!name) {
        newErrors.name = 'Name is required';
      }
   
    if (!address) {
      newErrors.address = 'Address is required';
    }
    if (!phone) {
        newErrors.phone = 'Phone Number is required';
      }
    if (!email) {
        newErrors.email = 'Email is required';
      }
      if (!cardNumber) {
        newErrors.cardNumber = 'Card Number is required';
      }
      if (!expiryDate) {
        newErrors.expiryDate = 'Expiry Date is required';
      }
      if (!cvv) {
        newErrors.cvv = 'CVV is required';
      }
    setErrors(newErrors);
    setLoading(true);
    // Simulate an API call or any checkout process
    setTimeout(() => {
      setLoading(false);
      // Handle successful checkout, redirect to order confirmation page, etc.
    }, 2000);
  };





  return (
    <CustomContainer maxWidth="lg">
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <br/>
        <Grid container spacing={3}>
          {/* Display cart items */}
          <hr className="my-4" />
                              <>
                            {orderItems.productList.map((product) => (

                            
                              <>
                                <MDBRow className="mb-4 d-flex justify-content-between align-items-center" style={{width:"100%", marginLeft:"5px"}}>
                                  <MDBCol md="3" lg="3" xl="3">
                                    <MDBTypography tag="h6" className="text-muted">
                                      Item
                                    </MDBTypography>
                                    <MDBTypography tag="h6" className="text-black mb-0">
                                      {product.name}
                                    </MDBTypography>
                                  </MDBCol>
                                  <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
              
                                    <MDBInput type="number"  defaultValue={product.quantity} size="sm" readOnly />
                                  </MDBCol>
                                  <MDBCol md="3" lg="2" xl="2" className="text-end">
                                    <MDBTypography tag="h6" className="mb-0">
                                      Rs. {product.price}
                                    </MDBTypography>
                                  </MDBCol>
                                </MDBRow>

                        
              
                                <hr className="my-4" />
                                </>
                                ))}
                                </>
          {/* ... */}
          {/* User Details */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              id = "name"
              variant="outlined"
              fullWidth
              value={name}
              autoComplete="name"
                helperText={errors.name}
                error={!!errors.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              id = "address"
              variant="outlined"
              fullWidth
              value={address}
              autoComplete="address"
                helperText={errors.address}
                error={!!errors.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              id="phone"
              fullWidth
              value={phone}
              autoComplete="phone"
                helperText={errors.phone}
                error={!!errors.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              id="email"
              value={email}
              autoComplete="email"
                helperText={errors.email}
                error={!!errors.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          {/* Payment Type */}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Payment Type</InputLabel>
              <Select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                label="Payment Type"
              >
                <MenuItem value="credit">Credit Card</MenuItem>
                <MenuItem value="debit">Debit Card</MenuItem>
                <MenuItem value="handsOn">Hands On Payment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Card Details Fields */}
          {paymentType === 'credit' || paymentType === 'debit' ? (
            <>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Card Number"
                  variant="outlined"
                  id="cardNumber"
                  fullWidth
                  value={cardNumber}
                  autoComplete="cardNumber"
                helperText={errors.cardNumber}
                error={!!errors.cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Expiry Date"
                  variant="outlined"
                  id="exDate"
                  fullWidth
                  value={expiryDate}
                  autoComplete="expiryDate"
                helperText={errors.expiryDate}
                error={!!errors.expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  id="cvv"
                  fullWidth
                  value={cvv}
                  autoComplete="cvv"
                helperText={errors.cvv}
                error={!!errors.cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Grid>
            </>
          ) : null}
          {/* Total Amount */}
          <Grid item xs={12}>
            <Typography variant="h6">
              Total Amount: Rs {orderItems.totalPrice} /=
            </Typography>
          </Grid>
          {/* Place Order Button */}
          <Grid item xs={12} >

          <MDBCardText tag="a" href="/cart" className="text-body">
                <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back to cart
            </MDBCardText>

            <Button
              variant="contained"
              color="primary"
              style={{float:"right"}}
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? <ThreeDots color="#FFF" height={20} width={20} /> : 'Place Order'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <br></br>
    </CustomContainer>
    
  );
};

export default CheckoutPage;
