import { Route } from 'react-router-dom';
import { LocalSalesPortal } from '../Components/LocalSales/LocalSalesPortal';
import { Roles } from '../model/company.model';
import { LocalSalesCustomers } from '../Components/LocalSales/Customer';
import { LocalSalesOrders } from '../Components/LocalSales/LocalSalesOrders';
import { LocalSalesCustomerFormView } from '../Components/LocalSales/Customer/LocalSalesCustomerFormView';
import ProtectedRoute from '../ProtectedRoute';
import LocalSalesPage from '../Pages/LocalSalesPage';
import { LocalSalesCustomerFormMode } from '../model/localSales.model';

export const LocalSalesRoute = () => {
  return (
    <Route
      path="/local-sales"
      element={<ProtectedRoute component={LocalSalesPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/local-sales" element={<LocalSalesPortal />} />
      <Route path="/local-sales/customers" element={<LocalSalesCustomers />} />
      <Route
        path="/local-sales/customers/edit/:id"
        element={<LocalSalesCustomerFormView formMode={LocalSalesCustomerFormMode.EDIT} />}
      />
      <Route
        path="/local-sales/customers/create"
        element={<LocalSalesCustomerFormView formMode={LocalSalesCustomerFormMode.CREATE} />}
      />
      <Route path="/local-sales/orders" element={<LocalSalesOrders />} />
    </Route>
  );
};
