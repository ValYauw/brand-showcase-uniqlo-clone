import { NavLink, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInState } from '../stores/actions/login';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import {
  AppBar,  
  Toolbar,
  Box, Container,
  Typography, Button
} from '@mui/material';

const brandName = 'Yunikuro CMS';

function ResponsiveAppBar() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoggedInState());
  }, []);
  const { isLoggedIn } = useSelector((state) => state.login);

  const navigate = useNavigate();

  function Logo() {
    return (
      <>
        <Container 
          sx={{ 
            width: '150px', 
            display: 'inline', 
            margin: 'auto', 
            paddingLeft: '0px' 
          }}>
          <img src='/brand-logo.png' alt='brand-logo' width='100%' />
        </Container>
        {/* <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <NavLink to="/">{ brandName }</NavLink>
        </Typography> */}
      </>
    )
  }

  function LogoutButton() {
    return (
      <Button
        sx={{ my: 2, color: 'white', display: 'block' }}
        onClick={() => {
          if (localStorage.getItem("access_token")) {
            localStorage.removeItem("access_token");
          }
          dispatch(showNotificationSnackbar({
            type: 'success',
            message: 'You have been logged out.'
          }))
          dispatch(setLoggedInState());
          navigate('/login');
        }}
      >
        <a>Logout</a>
      </Button>
    )
  }

  function NavItem({ route, linkText }) {
    return (
      <Button
        sx={{ display: 'block', padding: 'auto' }}
      >
        <NavLink to={route}>{linkText}</NavLink>
      </Button>
    )
  }

  function NavbarMenu() {

    if (isLoggedIn) {
      return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <NavItem route='/' linkText='Admin CMS' />
          <NavItem route='/register' linkText='Register new user' />
          <LogoutButton />
        </Box>
      )
    } else {
      return null
    }

  }

  return (
    <nav>
      <AppBar position="fixed">
        <Container maxWidth="xl" sx={{ backgroundColor: 'white' }}>
          <Toolbar disableGutters>
            <Logo />
            <NavbarMenu />
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}
export default ResponsiveAppBar;