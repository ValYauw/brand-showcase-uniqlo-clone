import useFormInput from '../hooks/useFormInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../stores/actions/login';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import { 
  Button, 
  TextField, Link, Box, Grid, Typography, Container
} from '@mui/material';
import Spinner from '../components/Spinner';

export default function Login() {

  const emailFormProps = useFormInput('');
  const passwordFormProps = useFormInput('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.login);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await dispatch(loginUser(
        emailFormProps.value, 
        passwordFormProps.value
      ))
      dispatch(showNotificationSnackbar({
        type: 'success',
        message: 'You are logged in. Redirecting you to the CMS portal...'
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
        Sign into the CMS
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          {...emailFormProps}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          {...passwordFormProps}
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
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