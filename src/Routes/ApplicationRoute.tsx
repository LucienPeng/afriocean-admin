import { Route } from 'react-router-dom';
import { Roles } from '../model/company.model';
import { ApplicationsPortal } from '../Components/Application/ApplicationsPortal';
import { DeplacementForm } from '../Components/Application/Form/DeplacementForm';
import { Absence } from '../Components/Application/Form/Absence';
import { HeuresSupplementaires } from '../Components/Application/Form/HeuresSupplementaires';
import ProtectedRoute from '../ProtectedRoute';
import ApplicationPage from '../Pages/ApplicationPage';

export const ApplicationRoute = () => {
  return (
    <Route
      path="/application"
      element={<ProtectedRoute component={ApplicationPage} permission={[Roles.ADMIN, Roles.USER]} />}
    >
      <Route path="/application" element={<ApplicationsPortal />} />
      <Route path="/application/deplacement" element={<DeplacementForm />} />
      <Route path="/application/absence-conge" element={<Absence />} />
      <Route path="/application/heures-supplémentaires" element={<HeuresSupplementaires />} />
    </Route>
  );
};
