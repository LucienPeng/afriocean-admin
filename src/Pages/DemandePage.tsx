import { Copyright } from '../Components/Common/CopyRight';
import { Layout as DemandeLayout } from '../Components/Common/Layout';
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
