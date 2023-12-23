import { Outlet } from 'react-router-dom';
import { PageLayout as FishPowderLayout } from '../Components/Common/PageLayout';
import { Copyright } from '../Components/Common/CopyRight';

const FishPowderPage = () => {
  return (
    <FishPowderLayout>
      <Outlet />
      <Copyright />
    </FishPowderLayout>
  );
};

export default FishPowderPage;
