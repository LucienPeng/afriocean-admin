import { Outlet } from 'react-router-dom';
import { PageLayout as LocalSalesLayout } from '../Components/Common/PageLayout';
import { Copyright } from '../Components/Common/CopyRight';

const LocalSalesPage = () => {
  return (
    <LocalSalesLayout>
      <Outlet />
      <Copyright />
    </LocalSalesLayout>
  );
};

export default LocalSalesPage;
