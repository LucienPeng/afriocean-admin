import { AdminDashboardComponent } from '../Components/Dashboard/AdminDashboardComponent';
import { PageLayout as DashboardLayout } from '../Components/Common/PageLayout';
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
