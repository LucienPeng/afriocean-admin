import { Copyright } from '../Components/Common/CopyRight';
import { Layout as AdminLayout } from '../Components/Common/Layout';
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
