import { useEffect } from 'react';
import { useUserRedux } from './useUserRedux';
import { getAuth } from 'firebase/auth';
import { getExpDate, parseJwt } from './Utils/jwt';
import { defaultTheme } from './Styles/themeOptions';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';
import UserPage from './Pages/UserPage';
import AdminPage from './Pages/AdminPage';
import SignInPage from './Pages/SignInPage';
import { CreateUserComponent } from './Components/WorkSpace/AdminWorkSpace/CreateUserComponent';
import { useAuthActions } from './Store/Auth/auth-actions';
import { Roles } from './model/company.model';
import { AdminDeplacementList } from './Components/WorkSpace/AdminWorkSpace/AdminDeplacementList';
import { UserDeplacementList } from './Components/WorkSpace/UserWorkSpace/UserDeplacementList';
import { ApplicationsPortal } from './Components/Application/ApplicationsPortal';
import { MaterialRoute } from './Routes/MaterialRoute';
import { LocalSalesRoute } from './Routes/LocalSalesRoute';
import { ApplicationRoute } from './Routes/ApplicationRoute';
import moment from 'moment';

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
  const { signOutHandler } = useAuthActions();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const isTokenExpired = await getToken();
      if (isTokenExpired) {
        signOutHandler();

        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    checkTokenValidity();
  }, [dispatch, navigate, signOutHandler]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route
          path="/*"
          element={<ProtectedRoute component={DashboardPage} permission={[Roles.ADMIN, Roles.USER]} />}
        />
        <Route path="/admin" element={<ProtectedRoute component={AdminPage} permission={[Roles.ADMIN]} />}>
          <Route path="/admin/create-user" element={<CreateUserComponent />} />
          <Route path="/admin/application" element={<ApplicationsPortal />} />
          <Route path="/admin/application/deplacement" element={<AdminDeplacementList />} />
        </Route>

        <Route path="/user" element={<ProtectedRoute component={UserPage} permission={[Roles.USER]} />}>
          <Route path="/user/application" element={<ApplicationsPortal />} />
          <Route path="/user/application/deplacement" element={<UserDeplacementList />} />
        </Route>

        {MaterialRoute()}
        {ApplicationRoute()}
        {LocalSalesRoute()}

        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
