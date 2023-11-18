import { useEffect } from 'react';
import { useUserRedux } from './useUserRedux';
import { getAuth } from 'firebase/auth';
import { getExpDate, parseJwt } from './Utils/jwt';
import { defaultTheme } from './Styles/themeOptions';
import { authActions } from './Store/Auth/auth-slice';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';
import AdminPage from './Pages/AdminPage';
import SignInPage from './Pages/SignInPage';
import moment from 'moment';
import { CreateUserComponent } from './Components/CreateUserComponent';

const getToken = async () => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    const accessJwtObj = parseJwt(idToken);
    const expDate = moment(getExpDate(accessJwtObj.exp));
    const now = moment();
    return expDate < now;
  }
  return false;
};

const App = () => {
  const { dispatch } = useUserRedux();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isTokenExpired = await getToken();
      if (isTokenExpired) {
        dispatch(authActions.loginFaild());
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    checkTokenValidity();
  }, [dispatch, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/*" element={<ProtectedRoute component={DashboardPage} />} />

        <Route path="/admin" element={<ProtectedRoute component={AdminPage} />}>
          <Route path="/admin/createUser" element={<CreateUserComponent />} />
        </Route>

        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
