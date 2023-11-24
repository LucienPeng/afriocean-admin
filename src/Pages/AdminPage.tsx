import { Copyright } from '../Components/Common/CopyRight';
import { PageLayout as AdminLayout } from '../Components/Common/PageLayout';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <AdminLayout>
      <Outlet />
      <Copyright />
    </AdminLayout>
  );
};

export default AdminPage;
