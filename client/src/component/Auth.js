import React, { useState, useEffect} from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import {Link, useNavigate} from 'react-router-dom';


export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSignup, setIsSignup] = useState(false);

  const sendRequest = async (type = 'signin') => {
    try {
      const res = await axios.post(`http://localhost:4000/api/users/${type}`, {
        name: input.name,
        email: input.email,
        password: input.password,
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup && input.password !== input.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (isSignup && (input.password ==='' ||  input.confirmPassword === '' || input.name === '' || input.email === '')) {
      alert('please fill all the fields');
      return;
    }

    if (isSignup) {
      sendRequest('register').then(data => {localStorage.setItem('userId', data.user._id)}).then(() => {dispatch(authAction.login())}).then(() => navigate('/blogs'));
    } else if(!isSignup && (input.email === '' || input.password === '')){
      alert('please fill all the fields');
    }
     else {
      sendRequest().then((data) => {
        if(data && data.message === 'correct user'){
          console.log(data)
          localStorage.setItem('userId', data.user._id)
          dispatch(authAction.login());
          navigate('/blogs');
        }else{
          alert('invalid account')
          dispatch(authAction.logout());
        }
      })
    }
  };

  
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if(storedLoggedIn === 'false'){
      dispatch(authAction.logout());
    }else{
      dispatch(authAction.login());
    }
  }, [dispatch]);
  

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    dispatch(authAction.login());
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth={400}
          margin="auto"
          marginTop={10}
          padding={3}
          boxShadow={3}
          borderRadius={10}
          bgcolor="#f5f5f5"
        >
          <Typography variant="h4" marginBottom={3} color="#333">
            {isSignup ? 'Sign-up' : 'Login'}
          </Typography>
          {isSignup && (
            <TextField
              value={input.name}
              label="Name"
              type="text"
              variant="outlined"
              margin="normal"
              color="primary"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          )}
          <TextField
            value={input.email}
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <TextField
            value={input.password}
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            color="primary"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          {isSignup && (
            <TextField
              value={input.confirmPassword}
              label="Confirm Password"
              type="password"
              variant="outlined"
              margin="normal"
              color="primary"
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          )}
          <Button
            onClick={handleLogin}
            type="submit"
            variant="contained"
            sx={{
              marginBottom: 1,
              borderRadius: 5,
              bgcolor: '#1976d2',
              color: '#fff',
            }}
          >
            Submit
          </Button>
          <Button LinkComponent={Link} to='/auth/forgotpassword' variant="text" color="primary" sx={{ marginBottom: 1 }}>
            Forgot your password?
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            variant="text"
            color="primary"
          >
            {isSignup ? 'Login' : 'Sign-up'}
          </Button>
        </Box>
      </form>
    </div>
  );
}