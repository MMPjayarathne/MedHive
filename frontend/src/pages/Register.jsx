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
import { useNavigate } from 'react-router-dom';



const theme = createTheme({
  typography: {
    body2: {
      color: '#ff0000', // This sets the text color for body2 typography variant to red
    },
  },
});

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

function generateRandom5DigitNumber() {
  const min = 10000; // Minimum 5-digit number (10,000)
  const max = 99999; // Maximum 5-digit number (99,999)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

export default function SignInSide() {
  const [email,setEmail] =useState('');
  const[userName,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [errors, setErrors] = useState({});
  const [fieldError,setFieldError] = useState("")
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newErrors = {};
    if(!data.get('name')){
      newErrors.name = "User name is required"
    }
    if(!data.get('email')){
      newErrors.email = "Email is required"
    }
    if(!data.get('password')){
      newErrors.password = "Password is required"
    }
    if(!data.get('conPassword')){
      newErrors.conPassword = "Confirm your password"
    }
    if(data.get('password').length<8){
      newErrors.password = "Password must be atleast eight characters"
    }
    if(data.get('password') !== data.get('conPassword')){
      newErrors.conPassword = "Passwords do not match"
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try{
        const email = data.get('email');
        const name  = data.get('name')
        const password = data.get('password');
        const authNumber = generateRandom5DigitNumber();
        const response = await axios.post(
          'http://localhost:8080/api/v1/user/register/email',
          {
            authNumber,
            email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );


        if(response.status === 200){
              console.log({email,password,name});
              const response = await axios.post(
                'http://localhost:8080/api/v1/user/register',
                {
                  name,
                  email,
                  password,
                  authNumber,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
        
              localStorage.setItem('email', email); // Store userId in localStorage


              if(response.data.code==="400"){
                setFieldError(response.data);
              }
              else if(response.data.code==="500"){
                setFieldError(response.data.message);
              }

              else{
                navigate('/signin');
              }
              console.log(email)
            }
            else{
              setFieldError('Internal Server error! Please try again later');
            }
      }catch(error){
        console.error(error);
        if (error.response) {
          // The request was made and the server responded with a status code outside the range of 2xx
          console.log('Error Status:', error.response.status);
          console.log('Error Data:', error.response.data);
  
          // You can display the error message to the user or handle it as needed
          setFieldError(error.response.data + ' Register again!');
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response received:', error.request);
          setFieldError('No response from the server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
          setFieldError('An unexpected error occurred. Please try again.');
        }
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
            backgroundImage: 'url(https://images.pexels.com/photos/4492103/pexels-photo-4492103.jpeg)',
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
              Sign Up
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
                id="name"
                label="User Name"
                name="name"
                autoComplete="name"
                autoFocus
                helperText={errors.name}
                error={!!errors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="conPassword"
                label="Confirm password"
                type="password"
                id="conPassword"
                autoComplete="current-password"
                helperText={errors.conPassword}
                error={!!errors.conPassword}
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
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign In"}
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