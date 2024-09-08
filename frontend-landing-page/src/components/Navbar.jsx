import { NavLink, useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showNotificationSnackbar } from '../stores/actions/snackbar';

import {
  AppBar,  
  Toolbar,
  Box, Container,
  Typography, Button
} from '@mui/material';

const brandName = 'Yunikuro';

function ResponsiveAppBar() {

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
          <NavLink to='/'>
            <img src='/brand-logo.png' alt='brand-logo' width='100%' />
          </NavLink>
        </Container>
      </>
    )
  }

  function NavItem({ route, linkText }) {
    return (
      <Button
        sx={{ display: 'block', padding: 'auto' }}
      >
        <a>{linkText}</a>
      </Button>
    )
  }

  function NavbarMenu() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
        <NavItem linkText='Women' />
        <NavItem linkText='Men' />
        <NavItem linkText='Kids' />
        <NavItem linkText='Baby' />
      </Box>
    )
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