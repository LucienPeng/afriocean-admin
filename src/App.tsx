import './App.css';
import SignInPage from './Pages/SignInPage';
import { ThemeProvider } from '@mui/material/styles';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { defaultTheme } from './styles/themeOptions';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        ProtectedRoute
        <Route
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<SignInPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
