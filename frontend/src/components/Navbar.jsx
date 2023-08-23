import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText,Box,TextField, Input } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@mui/icons-material';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Button = styled(Link)`
  
  color:white;
  &:hover {
    color: teal;
    transform: scale(1.2);
  }
`;
// const getTokenFromCookie = () => {
//   const cookieArray = document.cookie.split(';');
//   for (const cookie of cookieArray) {
//     const [name, value] = cookie.trim().split('=');
//     if (name === 'authToken') {
//       return value;
//     }
//   }
//   return null;
// };

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [token, setToken] = useState(null);
  const [Products, setProducts] = useState([]);
  const name = localStorage.getItem('name');
  const id = localStorage.getItem('id');
  const isAdmin = localStorage.getItem('isAdmin');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const temptoken = Cookies.get('token');
    setToken(temptoken)
  
  }, []);

  useEffect(() => {
    if(token){
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/v1/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProducts(response.data.productList);
      
        } catch (error) {
          console.error(error);
        
        }
      };
    fetchData();
  }
  }, [token]);
  const productListLength =Products ? Products.length : 0;
  console.log(productListLength)

 
    
  // useEffect(() => {
  //   const retrievedToken = getTokenFromCookie();
  //   setToken(retrievedToken);
  //   console.log(retrievedToken);
  // }, []);

 


  const handleMedhiveClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../home"; 
  };
  const handleHomeClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../home"; 
  }
  const handleShopClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../store"; 
  };
  const handleContactClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../home"; 
  };
  const handleAboutClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../home";
  };
  const handleAdminClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../home";
  };


  const handleLoginClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../signin"; 
  };
  const handleSignUpClick = () => {
    // Perform any necessary actions before redirecting
    window.location.href = "../signup"; 
  };
  const handleCart = ()=>{
    window.location.href = "/cart"
  }

  const handleMyNameClick=()=>{

    window.location.href = "../home";
  }
  const handleLogOutClick=()=>{

    Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('id');

    window.location.href = "../signin";
  }


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleSearchToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleChange = (e) => {
    console.log('Input value changed:', e.target.value);
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSearchEnter = async (value) =>{
    console.log("search")
    window.location.href = `../store?query=${value}`;
  };

  const drawerItems = (
    <List sx={{ display: 'block', width: '200px' }}>
    <ListItem>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: <SearchIcon onClick={() => handleSearchEnter(inputValue)} />,
          sx: { backgroundColor: 'white', borderRadius: '4px' },
        }}
      />
      
</ListItem>

    <ListItem button onClick={handleHomeClick}>
        <ListItemText primary="Home" />
    </ListItem>
    <ListItem button onClick={handleShopClick} >
        <ListItemText primary="Shop" />
    </ListItem>
    <ListItem button onClick={handleContactClick} >
        <ListItemText primary="Contact" />
    </ListItem>
    <ListItem buttononClick={handleAboutClick}>
        <ListItemText primary="About" />
    </ListItem>

    {token ? (
              <>
              {
                isAdmin=="true"?(
                    <ListItem button onClick={handleLoginClick}>
                    <ListItemText primary= "Admin Dashboard"/>
                    </ListItem>

                ):(
                    <ListItem button onClick={handleLoginClick}>
                    <ListItemText primary= {name}/>
                    </ListItem>
                )
              }
              
            <ListItem button onClick={handleLogOutClick}>
                <ListItemText primary="Log Out" />
            </ListItem>
            </>
            ):(
                <>
                <ListItem button onClick={handleLoginClick}>
                    <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={handleSignUpClick}>
                    <ListItemText primary="Sign Up" />
                </ListItem>

                </>
            )
    }
              
   
</List>
  );



  return (
        <AppBar position="fixed" sx={{ backgroundColor: '#003256' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { sm: 'none', xs: 'block' } }}
                onClick={handleDrawerToggle} 
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleMedhiveClick}>
                   MED<span style={{color: "#FFB800"}}>HIVE</span>
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSearchEnter(inputValue);
                      }
                    }}
                    InputProps={{
                    startAdornment: <SearchIcon onClick={() => handleSearchEnter(inputValue)}/>,
                    sx: { mr: 3, backgroundColor: 'white', borderRadius: '4px',display: { xs: 'none', sm: 'flex', md: 'flex' },
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center', },
                    }}
                />
                <Box
                    sx={{
                    mr: 2,
                    display: { xs: 'none', sm: 'flex', md: 'flex' },
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" sx={{ mx: 1, mr:2}}>
                        <Button onClick={handleHomeClick}>
                    Home
                    </Button>
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    <Button onClick={handleShopClick}>
                    Shop
                    </Button>
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    <Button onClick={handleHomeClick}>
                    Contact
                    </Button>
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    <Button onClick={handleHomeClick}>
                    About
                    </Button>
                    </Typography>

                    {token ? (
                        <>
                        {
                            isAdmin === "true" ?(
                                <Typography variant="body1" sx={{ mx: 1 , mr:2}} >
                                <Button onClick={handleAdminClick}>
                                Admin Dashboard
                                </Button>
                                </Typography>

                            ):(
                                <Typography variant="body1" sx={{ mx: 1 , mr:2}} >
                                <Button onClick={handleMyNameClick}>
                                {name}
                                </Button>
                                </Typography>

                            )

                        }
                        
                        <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                        <Button  onClick={handleLogOutClick}>
                       Log Out
                        </Button>
                        </Typography>
                        </>
                    ):(
                        <>
                        <Typography variant="body1" sx={{ mx: 1 , mr:2}} >
                        <Button onClick={handleLoginClick}>
                        Login
                        </Button>
                        </Typography>
                        <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                        <Button  onClick={handleSignUpClick}>
                        Sign Up
                        </Button>
                        </Typography>
                        </> 
                    )}
                  
                </Box>

                {
                    
                    isAdmin=="false"?(
                        <>
                        <IconButton color="inherit" sx={{ mx: 2 }}>
                            <Badge badgeContent={productListLength} color="error">
                            <ShoppingCartIcon onClick={handleCart} />
                            </Badge>
                        </IconButton>
                        
                        <IconButton color="inherit" sx={{ mr: 2 }}>
                          <img
                            src= "https://freesvg.org/img/abstract-user-flat-4.png" // Replace with the actual URL or source of the user's image
                            alt="User"
                            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                          />
                        </IconButton>
                        </>

                    ):(
                        <></>
                    )
                }
                </div>

            </Toolbar>
            <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                <div role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                {drawerItems}
                </div>
            </Drawer>
        </AppBar>

  );
};

export default Navbar;
