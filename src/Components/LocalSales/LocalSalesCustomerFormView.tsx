import * as yup from 'yup';

import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import { LocalSalesCustomerForm } from './LocalSalesCustomerForm';
import { useFirebaseFunctions } from '../../Utils/Firebase/useFirebaseFunctions';
import { useQuery } from '@tanstack/react-query';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

export const LocalSalesCustomerFormView = () => {
  const [serialId, setSerialId] = useState('');

  const { getCustomerIncrementalId } = useFirebaseFunctions();
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['serialId'],
    queryFn: () => getCustomerIncrementalId().then((result) => result.data),
  });

  useEffect(() => {
    if (isSuccess) setSerialId(data as string);
  }, [data, isSuccess]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Ajouter un nouveau client" containerMaxWidth="lg">
      <PageSection>
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
          Client Id: {!isLoading ? serialId : <CircularProgress size={20} />}
        </Typography>
        <LocalSalesCustomerForm serialId={serialId} />
      </PageSection>
    </PageWrapper>
  );
};
