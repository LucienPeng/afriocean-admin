import { CircularProgress, Stack, Typography } from '@mui/material';
import { LocalSalesFormMode } from '../../../../model/localSales.model';
import { PageSection } from '../../../Common/PageSection';
import { PageWrapper } from '../../../Common/PageWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useParams } from 'react-router-dom';
import { useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import { LocalSalesOrderFormWrapper } from './LocalSalesOrderFormWrapper';

export const LocalSalesOrderForm = (props: { formMode: LocalSalesFormMode }) => {
  const { formMode } = props;
  const { id } = useParams();
  const { getFirebaseDocumentData } = useFirebaseDB();

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Créer une nouvelle commande" containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          {formMode === LocalSalesFormMode.CREATE || formMode === LocalSalesFormMode.EDIT ? (
            <LocalSalesOrderFormWrapper
            // serialId={serialId}
            // editModeData={editModeData}
            // formMode={formMode}
            // refetchSerialId={refetch}
            />
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
