import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesCustomers = () => {
  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Customers" containerMaxWidth="lg">
      <PageSection>123wd </PageSection>
    </PageWrapper>
  );
};
