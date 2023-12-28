import { Route } from 'react-router-dom';
import { LocalSalesPortal } from '../Components/LocalSales/LocalSalesPortal';
import { Roles } from '../model/company.model';
import { LocalSalesCustomers } from '../Components/LocalSales/Customer';
import { LocalSalesOrders } from '../Components/LocalSales/Order';
import { LocalSalesCustomerForm } from '../Components/LocalSales/Customer/LocalSalesCustomerForm';
import ProtectedRoute from './ProtectedRoute';
import LocalSalesPage from '../Pages/LocalSalesPage';
import { LocalSalesFormMode } from '../model/localSales.model';
import { LocalSalesOrderForm } from '../Components/LocalSales/Order/LocalSalesOrderForm';

export const LocalSalesRoute = () => {
  return (
    <Route
      path="/local-sales"
      element={<ProtectedRoute component={LocalSalesPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route index path="/local-sales" element={<LocalSalesPortal />} />

      {/* CUSTOMERS */}
      <Route path="/local-sales/customers" element={<LocalSalesCustomers />} />
      <Route
        path="/local-sales/customers/create"
        element={<LocalSalesCustomerForm formMode={LocalSalesFormMode.CREATE} />}
      />
      <Route
        path="/local-sales/customers/edit/:id"
        element={<LocalSalesCustomerForm formMode={LocalSalesFormMode.EDIT} />}
      />
      {/* ORDERS */}
      <Route path="/local-sales/orders" element={<LocalSalesOrders />} />
      <Route
        path="/local-sales/orders/create/:id"
        element={<LocalSalesOrderForm formMode={LocalSalesFormMode.CREATE} />}
      />
      <Route path="/local-sales/orders/edit/:id" element={<LocalSalesOrderForm formMode={LocalSalesFormMode.EDIT} />} />
    </Route>
  );
};
