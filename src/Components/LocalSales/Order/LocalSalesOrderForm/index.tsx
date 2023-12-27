import { Stack } from '@mui/material';
import { LocalSalesFormMode } from '../../../../model/localSales.model';
import { PageSection } from '../../../Common/PageSection';
import { PageWrapper } from '../../../Common/PageWrapper';
import { LocalSalesOrderFormWrapper } from './LocalSalesOrderFormWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesOrderForm = (props: { formMode: LocalSalesFormMode }) => {
  const { formMode } = props;

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Créer une nouvelle commande" containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          {formMode === LocalSalesFormMode.CREATE || formMode === LocalSalesFormMode.EDIT ? (
            <LocalSalesOrderFormWrapper formMode={formMode} />
          ) : (
            <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
              {/* {true ? (
                <CircularProgress size={30} />
              ) : (
                <Typography> Désole, ce client n&apos;exsist pas.</Typography>
              )} */}
            </Stack>
          )}
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
