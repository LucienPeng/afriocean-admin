import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import { Grid } from '@mui/material';
import { LocalSalesCustomerNameControllers } from './LocalSalesCustomerNameControllers';
import { LocalSalesCustomerAddressController } from './LocalSalesCustomerAddressController';
import { LocalSalesCustomerPhoneControllers } from './LocalSalesCustomerPhoneControllers';
import { LocalSalesCustomerPersonalInfoControllers } from './LocalSalesCustomerPersonalInfoControllers';
import { LocalSalesCustomerActionButtons } from './LocalSalesCustomerActionButtons';
import { useNavigate } from 'react-router-dom';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { useFirebaseFUnctions } from '../../../Utils/Firebase/useFirebaseFunctions';
import { useEffect } from 'react';

export const LocalSalesCustomerForm = () => {
  const navigate = useNavigate();
  const { getData } = useFirebaseFUnctions();

  const LocalSalesCustomerForm = useForm<LocalSalesCustomer>({
    mode: 'onSubmit',
    //defaultValues: !isEditMode ? { ...createModeValues, itemId: id } : editModeValues,
    //resolver: yupResolver(schema),
  });
  const { reset, getValues, handleSubmit } = LocalSalesCustomerForm;

  const { setFirebaseData } = useFirebaseDB();

  const handleReset = () => {
    reset();
    navigate('/local-sales/customers');
  };

  const handleCreateCustomer = () => {
    setFirebaseData(Collections.LocalSalesCustomer, '000001', getValues());
  };

  useEffect(() => {
    getData()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [getData]);

  return (
    <FormProvider {...LocalSalesCustomerForm}>
      <Grid container rowSpacing={3} columnSpacing={12}>
        <LocalSalesCustomerNameControllers />
        <LocalSalesCustomerPersonalInfoControllers />
        <LocalSalesCustomerPhoneControllers />
        <LocalSalesCustomerAddressController />
        <LocalSalesCustomerActionButtons
          handleReset={handleReset}
          handleCreateCustomer={handleSubmit(handleCreateCustomer)}
        />
      </Grid>
    </FormProvider>
  );
};
