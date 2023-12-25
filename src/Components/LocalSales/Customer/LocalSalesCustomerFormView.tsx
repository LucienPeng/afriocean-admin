import { useParams } from 'react-router-dom';
import { useFirebaseFunctions } from '../../../Utils/Firebase/useFirebaseFunctions';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { PageSection } from '../../Common/PageSection';
import { PageWrapper } from '../../Common/PageWrapper';
import { LocalSalesCustomerForm } from './LocalSalesCustomerForm';
import { CircularProgress } from '@mui/material';
import { LocalSalesCustomer, LocalSalesCustomerFormMode } from '../../../model/localSales.model';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Typography from '@mui/material/Typography';
import { error } from 'console';

export const LocalSalesCustomerFormView = (props: { formMode: LocalSalesCustomerFormMode }) => {
  const { formMode } = props;
  const { id } = useParams();
  const { getCustomerIncrementalId } = useFirebaseFunctions();
  const { getFirebaseDocumentData } = useFirebaseDB();

  const { data: createModeData, isLoading: isCreateModeLoading } = useQuery({
    queryKey: ['serialId'],
    queryFn: () => getCustomerIncrementalId().then((result) => result.data),
    enabled: formMode === LocalSalesCustomerFormMode.CREATE,
  });

  const { data: editModeData, isLoading: isEditModeLoading } = useQuery({
    queryKey: ['customerInfo', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesCustomers, id as string).then((res) => {
        const milliseconds = res?.birthday.seconds * 1000;
        return { ...res, birthday: new Date(milliseconds) } as LocalSalesCustomer;
      }),
    enabled: formMode === LocalSalesCustomerFormMode.EDIT && !!id,
  });

  const [serialId, setSerialId] = useState('');

  useEffect(() => {
    if (formMode === LocalSalesCustomerFormMode.CREATE && createModeData) setSerialId(createModeData as string);
  }, [createModeData, formMode]);

  useEffect(() => {
    if (formMode === LocalSalesCustomerFormMode.EDIT && editModeData) setSerialId(editModeData.uuid);
  }, [editModeData, formMode]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Ajouter un nouveau client" containerMaxWidth="lg">
      <PageSection>
        {formMode === LocalSalesCustomerFormMode.CREATE ||
        (formMode === LocalSalesCustomerFormMode.EDIT && editModeData) ? (
          <>
            <Typography
              color="text.primary"
              mb={2}
              fontWeight={700}
              textAlign="left"
              width="100%"
              display="flex"
              alignItems="center"
              gap={2}
            >
              Client Id: {isCreateModeLoading || isEditModeLoading ? <CircularProgress size={20} /> : serialId}
            </Typography>
            <LocalSalesCustomerForm serialId={serialId} editModeData={editModeData} formMode={formMode} />
          </>
        ) : (
          "Désole, ce client n'exsist pas."
        )}
      </PageSection>
    </PageWrapper>
  );
};
