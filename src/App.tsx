import { defaultTheme } from './Styles/themeOptions';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ProtectedRoute from './Routes/ProtectedRoute';
import DashboardPage from './Pages/DashboardPage';
import UserPage from './Pages/UserPage';
import AdminPage from './Pages/AdminPage';
import SignInPage from './Pages/SignInPage';
import { CreateUserComponent } from './Components/WorkSpace/AdminWorkSpace/CreateUserComponent';
import { Roles } from './model/company.model';
import { AdminDeplacementList } from './Components/WorkSpace/AdminWorkSpace/AdminDeplacementList';
import { UserDeplacementList } from './Components/WorkSpace/UserWorkSpace/UserDeplacementList';
import { ApplicationsPortal } from './Components/Application/ApplicationsPortal';
import { MaterialRoute } from './Routes/MaterialRoute';
import { LocalSalesRoute } from './Routes/LocalSalesRoute';
import { ApplicationRoute } from './Routes/ApplicationRoute';
import ForgetPSWPage from './Pages/ForgotPSWPage';

const App = () => {
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
        <Route path="/forgot-password" element={<ForgetPSWPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
