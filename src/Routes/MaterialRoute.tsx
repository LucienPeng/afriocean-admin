import { Route } from 'react-router-dom';
import { MaterialPortal } from '../Components/Material/MaterialPortal';
import { MaterialItemForm } from '../Components/Material/MaterialItemForm';
import { Roles } from '../model/company.model';
import ProtectedRoute from '../ProtectedRoute';
import MaterialPage from '../Pages/MaterialPage';
import { MaterialDetail } from '../Components/Material/MaterialDetail';

export const MaterialRoute = () => {
  return (
    <Route
      path="/material"
      element={<ProtectedRoute component={MaterialPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/material" element={<MaterialPortal />} />
      <Route path="/material/create" element={<MaterialItemForm />} />
      <Route path="/material/:id">
        <Route path="view" element={<MaterialDetail />} />
        {/* <Route path="edit" element={<ShowDetailPage defaultFormMode={ShowFormMode.Edit} />} /> */}
      </Route>
    </Route>
  );
};
