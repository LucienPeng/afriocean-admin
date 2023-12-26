import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#224267',
      dark: '#172E48',
      light: '#4E6785',
      contrastText: '#F2F2F2',
    },
    secondary: {
      main: '#146C94',
      dark: '#144272',
      light: '#AFD3E2',
      contrastText: '#F2F2F2',
    },
    error: {
      main: '#D32F2F',
    },
    text: {
      primary: '#172E48',
      secondary: '#777777',
    },
    action: {
      disabledBackground: '#E0E0E0',
      disabled: '#7C7F82',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#E5E5E5',
    },
    custom: {
      iconAvatar: '#2D9596',
    },
    grey: {
      100: '#F8F9F9',
      200: '#E0E0E0',
      300: '#BEBFC0',
      500: '#929597',
      600: '#7C7F82',
      800: '#515558',
      900: '#3B3F43',
    },
  },
  typography: {
    fontFamily: " 'Oxygen', 'Kanit', 'Roboto' ",
    h1: {
      fontSize: '120px',
      fontWeight: 500,
    },
    h2: {
      fontSize: '26px',
      letterSpacing: 3,
    },
    h3: {
      fontSize: '24px',
    },
    h4: {
      fontSize: '22px',
    },
    h5: {
      fontSize: '20px',
    },
    h6: {
      fontSize: '18px',
    },
    body1: {
      fontSize: '1rem',
    },
  },
});
