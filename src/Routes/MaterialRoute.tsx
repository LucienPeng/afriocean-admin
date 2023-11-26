import { Route } from 'react-router-dom';
import { MaterialPortal } from '../Components/Material/MaterialPortal';
import { MaterialItemFormViewWrapper } from '../Components/Material/MaterialItemFormViewWrapper';
import { Roles } from '../model/company.model';
import ProtectedRoute from '../ProtectedRoute';
import MaterialPage from '../Pages/MaterialPage';
import { MaterialItemDetail } from '../Components/Material/MaterialItemDetail';

export const MaterialRoute = () => {
  return (
    <Route
      path="/material"
      element={<ProtectedRoute component={MaterialPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/material" element={<MaterialPortal />} />
      <Route path="/material/create" element={<MaterialItemFormViewWrapper />} />
      <Route path="/material/:id" element={<MaterialItemDetail />} />
    </Route>
  );
};
