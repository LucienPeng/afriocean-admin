import { Outlet } from 'react-router-dom';
import { PageLayout as MaterialLayout } from '../Components/Common/PageLayout';
import { Copyright } from '../Components/Common/CopyRight';

const MaterialPage = () => {
  return (
    <MaterialLayout>
      <Outlet />
      <Copyright />
    </MaterialLayout>
  );
};

export default MaterialPage;
