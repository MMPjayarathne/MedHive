import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <div> 
    <Navbar />
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://medhiv.com/">
          MedHive
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const theme = createTheme({
  typography: {
    body2: {
      color: '#ff0000', // This sets the text color for body2 typography variant to red
    },
  },
});



export default function SignInSide() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [fieldError,setFieldError] = useState("")
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      const currentUrl = new URL(window.location.href);
      const activeValue = currentUrl.searchParams.get('active');
      const authNo = localStorage.getItem('authNo');
      const tempEmail = localStorage.getItem('email');

      console.log('coming', activeValue);
      console.log('had', authNo);

      if (activeValue === authNo) {
        console.log('Hello');
        try {
          const response0 = await axios.put(
            'http://localhost:8080/api/v1/user/register/auth',
            {
              email: tempEmail,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response0.data.code === '01') {
            setFieldError(response0.data.message);
          } else if (response0.data.code === '06') {
            setFieldError(response0.data.message);
          } else {
            alert('Your account has been activated! Try signing in.');
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (activeValue && activeValue !== authNo) {
        setFieldError('The activation link has expired!');
      }
    };

    activateAccount();
  }, []);


  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newErrors = {};

    if (!data.get('email')) {
      newErrors.email = 'Email is required';
    }
    if (!data.get('password')) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      /*console.log({
        email: data.get('email'),
        password: data.get('password'),
      });*/

     
      try{
        const email = data.get('email');
        const password = data.get('password');
        console.log({email,password});
        const response = await axios.post(
          'http://localhost:8080/api/v1/user/login',
          {
            email,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if(response.data.code==="01"){
          setFieldError(response.data.message);
        }
        else if(response.data.code==="06"){
          setFieldError(response.data.message);
        }
        else{
          localStorage.setItem('token', response.data.token);

          const decodedToken = jwt_decode(response.data.token);
          const userData = {
            id: decodedToken.sub,
          };
          setUser(userData);
          localStorage.setItem('email',response.email);
          localStorage.setItem('name',response.data.name);
          localStorage.setItem('id',response.data.id);
          localStorage.setItem('isAdmin',response.data.isAdmin);
          navigate('/home');
        }
        console.log(email)
      }catch(error){
        console.error(error);
      }
    }
  };
 

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.pexels.com/photos/4492093/pexels-photo-4492093.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {!fieldError && (
              <Typography component="h1" variant="h5">
                Hi! Welcome to MedHive
              </Typography>
            )}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {fieldError && (
              <Typography variant="body2" color="error" align="center">
                {fieldError}
              </Typography>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={errors.email}
                error={!!errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password}
                error={!!errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}