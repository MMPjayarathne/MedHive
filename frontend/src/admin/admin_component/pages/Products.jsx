import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredProducts = products.filter(product => product.Name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TextField
        label="Search Products"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.Name}</TableCell>
                <TableCell>{product.Description}</TableCell>
                <TableCell>${product.Price.$numberDouble}</TableCell>
                <TableCell>{/* Category Name or ID */}</TableCell>
                <TableCell>
                  {/* Add buttons or links for editing/removing */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary">Add Product</Button>
    </div>
  );
};

export default ProductsPage;
