import { Route } from 'react-router-dom';
import { MaterialPortal } from '../Components/Material/MaterialPortal';
import { MaterialItem } from '../Components/Material/MaterialCreateItem';
import { Roles } from '../model/company.model';
import ProtectedRoute from '../ProtectedRoute';
import MaterialPage from '../Pages/MaterialPage';

export const MaterialRoute = () => {
  return (
    <Route
      path="/material"
      element={<ProtectedRoute component={MaterialPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/material" element={<MaterialPortal />} />
      <Route path="/material/create" element={<MaterialItem />} />
    </Route>
  );
};
