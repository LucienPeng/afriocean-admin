import { Copyright } from '../Components/Common/CopyRight';
import { PageLayout as UserLayout } from '../Components/Common/PageLayout';
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
