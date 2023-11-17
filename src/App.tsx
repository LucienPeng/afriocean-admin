import './App.css';
import Copyright from './SignInPage';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './styles/themeOptions';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Copyright />
    </ThemeProvider>
  );
}

export default App;
