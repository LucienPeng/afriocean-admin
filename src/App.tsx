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
import MaterialPage from './Pages/MaterialPage';
import AdminPage from './Pages/AdminPage';
import SignInPage from './Pages/SignInPage';
import DemandePage from './Pages/DemandePage';
import { CreateUserComponent } from './Components/WorkSpace/AdminWorkSpace/CreateUserComponent';
import { useAuthActions } from './Store/Auth/auth-actions';
import { Roles } from './model/company.model';
import { DeplacementForm } from './Components/Application/DeplacementForm';
import { Absence } from './Components/Application/Absence';
import { HeuresSupplementaires } from './Components/Application/HeuresSupplementaires';
import { AdminDeplacementList } from './Components/WorkSpace/AdminWorkSpace/AdminDeplacementList';
import { UserDeplacementList } from './Components/WorkSpace/UserWorkSpace/UserDeplacementList';
import { ApplicationsPortal } from './Components/Application/ApplicationsPortal';
import moment from 'moment';
import { MaterialPortal } from './Components/Material/MaterialPortal';
import { MaterialItem } from './Components/Material/MaterialCreateItem';

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

        <Route
          path="/material"
          element={<ProtectedRoute component={MaterialPage} permission={[Roles.ADMIN, Roles.USER]} />}
        >
          <Route path="/material" element={<MaterialPortal />} />
          <Route path="/material/create" element={<MaterialItem />} />
        </Route>

        <Route
          path="/demande"
          element={<ProtectedRoute component={DemandePage} permission={[Roles.ADMIN, Roles.USER]} />}
        >
          <Route path="/demande" element={<ApplicationsPortal />} />
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
