import React from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const ProductImage = styled('img')({
  maxWidth: '100%',
});

const CustomContainer = styled(Container)({
    paddingTop: '60px',
  });
  

const ProductPage = () => {
  return (
    <CustomContainer maxWidth="lg">
      <Paper sx={{ p: 3 }} elevation={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ProductImage src="https://images.theconversation.com/files/256057/original/file-20190129-108364-17hlc1x.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" alt="Product" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom>
              Product Name
            </Typography>
            <Typography variant="body1" gutterBottom>
              Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: $XX.XX
            </Typography>
            <Button variant="contained" color="primary">
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </CustomContainer>
  );
};

export default ProductPage;
