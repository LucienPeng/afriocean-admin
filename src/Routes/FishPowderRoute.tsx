import { Route } from 'react-router-dom';
import { FishPowderPortal } from '../Components/FishPowder/FishPowderPortal';
// import { MaterialItemFormViewWrapper } from '../Components/Material/MaterialItemFormViewWrapper';
import { Roles } from '../model/company.model';
import ProtectedRoute from '../ProtectedRoute';
import FishPowderPage from '../Pages/FishPowderPage';
// import { MaterialItemDetail } from '../Components/Material/MaterialItemDetail/MaterialItemDetailWrapper';

export const FishPowderRoute = () => {
  return (
    <Route
      path="/fish-powder"
      element={<ProtectedRoute component={FishPowderPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/fish-powder" element={<FishPowderPortal />} />
      {/* <Route path="/fish-powder/create/:id" element={<MaterialItemFormViewWrapper />} />
      <Route path="/fish-powder/:id" element={<MaterialItemDetail />} /> */}
    </Route>
  );
};
