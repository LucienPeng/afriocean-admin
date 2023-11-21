import { AdminDashboardComponent } from '../Components/Dashboard/AdminDashboardComponent';
import { Layout as DashboardLayout } from '../Components/Common/Layout';
import { Copyright } from '../Components/Common/CopyRight';
import { useUserRedux } from '../useUserRedux';
import { Roles } from '../model/company.model';
import { UserDashboardComponent } from '../Components/Dashboard/UserDashboardComponent';

const DashboardPage = () => {
  const { role } = useUserRedux();
  return (
    <DashboardLayout>
      {role === Roles.ADMIN ? <AdminDashboardComponent /> : <UserDashboardComponent />}
      <Copyright />
    </DashboardLayout>
  );
};

export default DashboardPage;
