import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PageSection } from '../../Common/PageSection';
import { PageWrapper } from '../../Common/PageWrapper';
import { LocalSalesCustomerForm } from './LocalSalesCustomerForm';
import { CircularProgress, Stack } from '@mui/material';
import { LocalSalesCustomer, LocalSalesCustomerFormMode } from '../../../model/localSales.model';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Typography from '@mui/material/Typography';

export const LocalSalesCustomerFormView = (props: { formMode: LocalSalesCustomerFormMode }) => {
  const { formMode } = props;
  const { id } = useParams();
  const { getFirebaseDocumentData } = useFirebaseDB();

  const { data: createModeData, refetch } = useQuery({
    queryKey: ['getSerialId'],
    queryFn: () => getFirebaseDocumentData(Collections.IncrementalCounter, 'LocalSalesCustomers').then((res) => res),
    enabled: formMode === LocalSalesCustomerFormMode.CREATE,
  });

  const { data: editModeData, isLoading: isEditModeLoading } = useQuery({
    queryKey: ['customerInfo', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesCustomers, id as string).then((res) => {
        if (!res) throw Error('This customer is not exist');
        return { ...res, birthday: new Date(res?.birthday) } as LocalSalesCustomer;
      }),
    enabled: formMode === LocalSalesCustomerFormMode.EDIT && !!id,
    retry: false,
  });

  const [serialId, setSerialId] = useState('');

  useEffect(() => {
    function generateIncrementalId(currentId: string) {
      const paddedId = currentId.padStart(6, '0');
      return paddedId;
    }
    if (formMode === LocalSalesCustomerFormMode.CREATE && createModeData) {
      setSerialId(generateIncrementalId(createModeData.index.toString()));
    }
  }, [createModeData, formMode]);

  useEffect(() => {
    if (formMode === LocalSalesCustomerFormMode.EDIT && editModeData) setSerialId(editModeData.uuid);
  }, [editModeData, formMode]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Ajouter un nouveau client" containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
          {formMode === LocalSalesCustomerFormMode.CREATE ||
          (formMode === LocalSalesCustomerFormMode.EDIT && editModeData) ? (
            <LocalSalesCustomerForm
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
    </PageWrapper>
  );
};
