import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PageSection } from '../../../Common/PageSection';
import { PageWrapper } from '../../../Common/PageWrapper';
import { CircularProgress, Stack } from '@mui/material';
import { LocalSalesCustomer, LocalSalesFormMode } from '../../../../model/localSales.model';
import { Collections, useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Typography from '@mui/material/Typography';
import { LocalSalesCustomerFormWrapper } from './LocalSalesCustomerFormWrapper';

export const LocalSalesCustomerForm = (props: { formMode: LocalSalesFormMode }) => {
  const { formMode } = props;
  const { id } = useParams();
  const { getFirebaseDocumentData } = useFirebaseDB();

  const { data: createModeData, refetch } = useQuery({
    queryKey: ['getSerialId'],
    queryFn: () => getFirebaseDocumentData(Collections.IncrementalCounter, 'LocalSalesCustomers').then((res) => res),
    enabled: formMode === LocalSalesFormMode.CREATE,
  });

  const { data: editModeData, isLoading: isEditModeLoading } = useQuery({
    queryKey: ['customerInfo', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesCustomers, id as string).then((res) => {
        if (!res) throw Error('This customer is not exist');
        return { ...res, birthday: new Date(res?.birthday) } as LocalSalesCustomer;
      }),
    enabled: formMode === LocalSalesFormMode.EDIT && !!id,
    retry: false,
  });

  const [serialId, setSerialId] = useState('');

  useEffect(() => {
    function generateIncrementalId(currentId: string) {
      const paddedId = currentId.padStart(6, '0');
      return paddedId;
    }
    if (formMode === LocalSalesFormMode.CREATE && createModeData) {
      setSerialId(generateIncrementalId(createModeData.index.toString()));
    }
  }, [createModeData, formMode]);

  useEffect(() => {
    if (formMode === LocalSalesFormMode.EDIT && editModeData) setSerialId(editModeData.uuid);
  }, [editModeData, formMode]);

  return (
    <PageWrapper
      icon={<PointOfSaleIcon />}
      componentName={formMode === LocalSalesFormMode.EDIT ? 'Détails clientels' : 'Ajouter un nouveau client'}
      containerMaxWidth="lg"
    >
      <PageSection>
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          {formMode === LocalSalesFormMode.CREATE || (formMode === LocalSalesFormMode.EDIT && editModeData) ? (
            <LocalSalesCustomerFormWrapper
              serialId={serialId}
              editModeData={editModeData}
              formMode={formMode}
              refetchSerialId={refetch}
            />
          ) : (
            <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
              {isEditModeLoading ? (
                <CircularProgress size={30} />
              ) : (
                <Typography> Désole, ce client n&apos;exsist pas.</Typography>
              )}
            </Stack>
          )}
        </Stack>
      </PageSection>
      <PageSection>Client Order Table</PageSection>
    </PageWrapper>
  );
};
