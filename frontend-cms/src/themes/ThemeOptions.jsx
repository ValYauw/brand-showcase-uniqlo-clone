import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#d21919',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      '\'Fira Sans Extra Condensed\'',
      'Roboto', 
      'Arial',
      'sans-serif'
    ].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Fira Sans Extra Condensed';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
      }

      a {
        text-decoration: none;
        color: #f50057;
      }

      a:visited, a:hover {
        color: #AB003C;
      }

      nav a {
        font-size: 14pt;
        color: #52544e;
      }

      nav a:visited, nav a:hover {
        color: #282926;
      }

      .product-card-category, .product-card-name, .product-card-price {
        font-weight: 500 !important;
      }
      .product-card-category {
        text-transform: uppercase;
      }
      .product-card-category, .product-card-price {
        color: #8e8f8b;
      }
      .product-card-description {
        font-family: 'Arial' !important;
      }

      `,
    },
  },
});