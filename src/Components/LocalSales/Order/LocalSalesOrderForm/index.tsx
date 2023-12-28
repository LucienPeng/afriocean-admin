import { Stack } from '@mui/material';
import { LocalSalesFormMode } from '../../../../model/localSales.model';
import { PageSection } from '../../../Common/PageSection';
import { PageWrapper } from '../../../Common/PageWrapper';
import { LocalSalesOrderFormWrapper } from './LocalSalesOrderFormWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesOrderForm = (props: { formMode: LocalSalesFormMode }) => {
  const { formMode } = props;

  return (
    <PageWrapper
      icon={<PointOfSaleIcon />}
      componentName={formMode === LocalSalesFormMode.CREATE ? 'Créer une nouvelle commande' : 'Édit commande'}
      containerMaxWidth="lg"
    >
      <PageSection>
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          <LocalSalesOrderFormWrapper formMode={formMode} />
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
