import { Route } from 'react-router-dom';
import { LocalSalesPortal } from '../Components/LocalSales/LocalSalesPortal';
import { Roles } from '../model/company.model';
import ProtectedRoute from '../ProtectedRoute';
import LocalSalesPage from '../Pages/LocalSalesPage';
import { LocalSalesCustomers } from '../Components/LocalSales/LocalSalesCustomers';
import { LocalSalesOrders } from '../Components/LocalSales/LocalSalesOrders';

export const LocalSalesRoute = () => {
  return (
    <Route
      path="/local-sales"
      element={<ProtectedRoute component={LocalSalesPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/local-sales" element={<LocalSalesPortal />} />
      <Route path="/local-sales/customers" element={<LocalSalesCustomers />} />
      <Route path="/local-sales/orders" element={<LocalSalesOrders />} />
    </Route>
  );
};
