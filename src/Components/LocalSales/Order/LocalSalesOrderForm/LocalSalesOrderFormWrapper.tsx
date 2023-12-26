import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesOrder } from '../../../../model/localSales.model';
import { CircularProgress, Grid } from '@mui/material';
import { LocalSalesOrderClientInfo } from './LocalSalesOrderClientInfo';
import { useQuery } from '@tanstack/react-query';
import { Collections, useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import { useParams } from 'react-router-dom';
import { LocalSalesOrderProductsAccordionWrapper } from './LocalSalesOrderProductsAccordionWrapper';

export const LocalSalesOrderFormWrapper = () => {
  const { getFirebaseDocumentData } = useFirebaseDB();
  const { id } = useParams();

  const { data, isLoading: isEditModeLoading } = useQuery({
    queryKey: ['customerInfo', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesCustomers, id as string).then((res) => {
        if (!res) throw Error('This customer is not exist');
        return { ...res, birthday: new Date(res?.birthday) } as LocalSalesCustomer;
      }),
    //  enabled: formMode === LocalSalesFormMode.EDIT && !!id,
    retry: false,
  });

  const LocalSalesOrderForm = useForm<LocalSalesOrder>({
    mode: 'onSubmit',
    //defaultValues: DEFAULT_VALUES,
    // values: editModeData,
    // resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...LocalSalesOrderForm}>
      {data ? (
        <Grid container rowSpacing={5} columnSpacing={12}>
          <LocalSalesOrderClientInfo customer={data} />
          <LocalSalesOrderProductsAccordionWrapper />
        </Grid>
      ) : (
        <CircularProgress size={30} />
      )}
    </FormProvider>
  );
};
