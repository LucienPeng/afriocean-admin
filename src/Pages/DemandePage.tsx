import { Copyright } from '../Components/Common/CopyRight';
import { PageLayout as DemandeLayout } from '../Components/Common/PageLayout';
import { Outlet } from 'react-router-dom';

const DemandePage = () => {
  return (
    <DemandeLayout>
      <Outlet />
      <Copyright />
    </DemandeLayout>
  );
};

export default DemandePage;
