import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerNewUser } from '../stores/actions/register';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import { 
  Button, 
  TextField, Link, Box, Grid, Typography, Container
} from '@mui/material';
import Spinner from '../components/Spinner';

export default function Register() {

  const [registerFormInput, setRegisterFormInput] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  })

  const handleChange = (e) => {
    setRegisterFormInput({
      ...registerFormInput,
      [e.target.name]: e.target.value
    })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.register);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(registerNewUser(registerFormInput));
      dispatch(showNotificationSnackbar({
        type: 'success',
        message: 'New user has been registered. Please let them log in from another machine.'
      }));
      navigate('/');
    } catch(err) {
      const errors = err?.response?.data?.errors;
      dispatch(showNotificationSnackbar({
        type: 'error',
        message: errors ? errors[0].message : 'Internal Server Error',
      }));
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
      <Typography component="h1" variant="h5">
        Register New User
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          value={registerFormInput.username}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          label="Username"
          name="username"
        />
        <TextField
          value={registerFormInput.email}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
        />
        <TextField
          value={registerFormInput.password}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
        />
        <TextField
          value={registerFormInput.phoneNumber}
          onChange={handleChange}
          margin="normal"
          fullWidth
          label="Phone Number"
          name="phoneNumber"
        />
        <TextField
          value={registerFormInput.address}
          onChange={handleChange}
          margin="normal"
          fullWidth
          label="Address"
          name="address"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

      </Box>

      <Spinner open={isLoading} />

    </Box>
  );
}