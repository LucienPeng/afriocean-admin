import { AdminDashboardComponent } from '../Components/AdminWorkSpace/AdminDashboardComponent';
import { Layout as DashboardLayout } from '../Components/Common/Layout';
import { Copyright } from '../Components/Common/CopyRight';
import { useUserRedux } from '../useUserRedux';
import { Roles } from '../model/compan.model';
import { UserDashboardComponent } from '../Components/ClientWorkSpace/UserDashboardComponent';

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
