import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText,Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar } from '@mui/material';


const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerItems = (
    <List sx={{ display: 'block', width: '200px' }}>
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
</List>
  );

  return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { sm: 'none', xs: 'block' } }}
                onClick={handleDrawerToggle} // add onClick handler here
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Avatar
                        alt="Logo"
                        src="../visuals/logo.jpg"
                        sx={{ mr: 2 }}
                    />
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                    mr: 2,
                    display: { xs: 'none', sm: 'flex', md: 'flex' },
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    }}
                >
                    <Typography variant="body1" sx={{ mx: 1 }}>
                    Home
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                    Shop
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                    Contact
                    </Typography>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                    About
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
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                <div role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
                {drawerItems}
                </div>
            </Drawer>
        </AppBar>

  );
};

export default Navbar;
