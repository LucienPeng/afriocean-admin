import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesOrders = () => {
  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Orders" containerMaxWidth="lg">
      <PageSection>4554545 </PageSection>
    </PageWrapper>
  );
};
