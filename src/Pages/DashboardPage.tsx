import { DashboardComponent } from '../Components/AdminWorkSpace/DashboardComponent';
import { Layout as DashboardLayout } from '../Components/Common/Layout';
import { Copyright } from '../Components/Common/CopyRight';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardComponent />
      <Copyright />
    </DashboardLayout>
  );
};

export default DashboardPage;
