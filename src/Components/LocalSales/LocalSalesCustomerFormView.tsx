import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import { LocalSalesCustomerForm } from './LocalSalesCustomerForm';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesCustomerFormView = () => {
  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Ajouter un nouveau client" containerMaxWidth="lg">
      <PageSection>
        <LocalSalesCustomerForm />
      </PageSection>
    </PageWrapper>
  );
};
