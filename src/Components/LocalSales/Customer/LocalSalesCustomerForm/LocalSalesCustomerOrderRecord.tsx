import React from 'react';
import { PageSection } from '../../../Common/PageSection';
import { useFirebaseFunctions } from '../../../../Utils/Firebase/useFirebaseFunctions';
import { LocalSalesOrder } from '../../../../model/localSales.model';

export const LocalSalesCustomerOrderRecord = () => {
  const { getCustomerOrder } = useFirebaseFunctions();

  getCustomerOrder({ id: 'H12345' })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  return <PageSection>Client Order Table</PageSection>;
};
