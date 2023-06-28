import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText,Box,TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@mui/icons-material';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleSearchToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerItems = (
    <List sx={{ display: 'block', width: '200px' }}>
    <ListItem button>
        <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            InputProps={{
            startAdornment: <SearchIcon />,
            sx: { backgroundColor: 'white', borderRadius: '4px' },
            }}
        />
    </ListItem>
    <ListItem button>
        <ListItemText primary="Home" />
    </ListItem>
    <ListItem button>
        <ListItemText primary="Shop" />
    </ListItem>
    <ListItem button>
        <ListItemText primary="Contact" />
    </ListItem>
    <ListItem button>
        <ListItemText primary="About" />
    </ListItem>
    <ListItem button>
        <ListItemText primary="Login" />
    </ListItem>
    <ListItem button>
        <ListItemText primary="Sign Up" />
    </ListItem>
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                   MED<span style={{color: "#FFB800"}}>HIVE</span>
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search"
                    InputProps={{
                    startAdornment: <SearchIcon />,
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
                    Home
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    Shop
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    Contact
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    About
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    Login
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 , mr:2}}>
                    Sign Up
                    </Typography>
                </Box>
                <IconButton color="inherit" sx={{ mx: 2 }}>
                    <Badge badgeContent={4} color="error">
                    <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                </div>
                <IconButton color="inherit" sx={{ mr: 2 }}>
                <Badge badgeContent={2} color="error">
                    <FavoriteIcon />
                </Badge>
                </IconButton>


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
