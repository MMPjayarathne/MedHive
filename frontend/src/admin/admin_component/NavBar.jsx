import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const NavBar = () => {
  return (
    <>
      <Sidebar>
        <Menu style={{height: "100vh"}}>
          <Typography style={{margin:"10px"}} variant="h4">Welcome!</Typography>
          <MenuItem component={<Link to="/admin/users" />}>Users</MenuItem>
          <MenuItem component={<Link to="/admin/products" />}>Products</MenuItem>
          <MenuItem component={<Link to="/admin/categories" />}>Categories</MenuItem>
          <MenuItem component={<Link to="/admin/orders" />}>Orders</MenuItem>
          <MenuItem component={<Link to="/home" />}>Costomers' view</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default NavBar;
