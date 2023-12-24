import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import { Grid } from '@mui/material';
import { LocalSalesCustomerNameControllers } from './LocalSalesCustomerNameControllers';
import { LocalSalesCustomerAddressController } from './LocalSalesCustomerAddressController';
import { LocalSalesCustomerPhoneControllers } from './LocalSalesCustomerPhoneControllers';
import { LocalSalesCustomerPersonalInfoControllers } from './LocalSalesCustomerPersonalInfoControllers';
import { LocalSalesCustomerActionButtons } from './LocalSalesCustomerActionButtons';
import { useNavigate } from 'react-router-dom';

export const LocalSalesCustomerForm = () => {
  const LocalSalesCustomerForm = useForm<LocalSalesCustomer>({
    mode: 'onSubmit',
    //defaultValues: !isEditMode ? { ...createModeValues, itemId: id } : editModeValues,
    //resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { reset } = LocalSalesCustomerForm;

  const handleReset = () => {
    reset();
    navigate('/local-sales/customers');
  };

  return (
    <FormProvider {...LocalSalesCustomerForm}>
      <Grid container rowSpacing={3} columnSpacing={12}>
        <LocalSalesCustomerNameControllers />
        <LocalSalesCustomerPersonalInfoControllers />
        <LocalSalesCustomerPhoneControllers />
        <LocalSalesCustomerAddressController />
        <LocalSalesCustomerActionButtons handleReset={handleReset} />
      </Grid>
    </FormProvider>
  );
};
