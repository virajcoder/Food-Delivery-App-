import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  form: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
}));



const Login = ( ) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, such as sending credentials to a backend API
    console.log('Login form submitted:', formData);
    localStorage.setItem("token", JSON.stringify(formData));
    const token=localStorage.getItem('token');
    if(token){
      navigate('/')
      window.location.reload()
      toast('login successfully')
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username or Email"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
