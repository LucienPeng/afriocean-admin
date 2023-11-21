import { useEffect } from 'react';
import { useUserRedux } from './useUserRedux';
import { getAuth } from 'firebase/auth';
import { getExpDate, parseJwt } from './Utils/jwt';
import { defaultTheme } from './Styles/themeOptions';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';
import AdminPage from './Pages/AdminPage';
import SignInPage from './Pages/SignInPage';
import moment from 'moment';
import { CreateUserComponent } from './Components/CreateUserComponent';
import DemandePage from './Pages/DemandePage';
import { useAuthActions } from './Store/Auth/auth-actions';
import { Roles } from './model/company.model';
import { DeplacementForm } from './Components/Application/DeplacementForm';
import { Absence } from './Components/Application/Absence';
import { HeuresSupplementaires } from './Components/Application/HeuresSupplementaires';
import { DeplacementList } from './Components/DeplacementList';
import { ApplicationsNavigation } from './Components/ApplicationsNavigation';

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
          <Route path="/admin/application-list" element={<ApplicationsNavigation />} />
        </Route>

        <Route
          path="/demande"
          element={<ProtectedRoute component={DemandePage} permission={[Roles.ADMIN, Roles.USER]} />}
        >
          <Route path="/demande/deplacement" element={<DeplacementForm />} />
          <Route path="/demande/absence-conge" element={<Absence />} />
          <Route path="/demande/heures-supplémentaires" element={<HeuresSupplementaires />} />
        </Route>

        <Route path="/login" element={<SignInPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
