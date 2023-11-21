import { Copyright } from '../Components/Common/CopyRight';
import { Layout as UserLayout } from '../Components/Common/Layout';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  return (
    <UserLayout>
      <Outlet />
      <Copyright />
    </UserLayout>
  );
};

export default UserPage;
