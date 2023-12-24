import { useEffect, useState } from 'react';
import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import { LocalSalesCustomerForm } from './LocalSalesCustomerForm';
import { useFirebaseFUnctions } from '../../Utils/Firebase/useFirebaseFunctions';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesCustomerFormView = () => {
  const { getCustomerIncrementalId } = useFirebaseFUnctions();
  const [customerSerialId, setCustomerSerialId] = useState(0);

  useEffect(() => {
    getCustomerIncrementalId()
      .then((res) => setCustomerSerialId(res.data as number))
      .catch((err) => console.log(err));
  }, [getCustomerIncrementalId]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Ajouter un nouveau client" containerMaxWidth="lg">
      <PageSection>
        id: {customerSerialId}
        <LocalSalesCustomerForm />
      </PageSection>
    </PageWrapper>
  );
};
