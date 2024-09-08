// import { useState } from 'react';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { themeOptions } from "./themes/ThemeOptions";
import CssBaseline from '@mui/material/CssBaseline';

import { router } from './routes/index';
import { store } from './stores';

function App() {
  return (
    <>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
