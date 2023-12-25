import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesCustomerFormMode } from '../../../../model/localSales.model';
import { Alert, Button, CircularProgress, Grid, Snackbar, Stack } from '@mui/material';
import { LocalSalesCustomerNameControllers } from './LocalSalesCustomerNameControllers';
import { LocalSalesCustomerAddressController } from './LocalSalesCustomerAddressController';
import { LocalSalesCustomerPhoneControllers } from './LocalSalesCustomerPhoneControllers';
import { LocalSalesCustomerPersonalInfoControllers } from './LocalSalesCustomerPersonalInfoControllers';
import { LocalSalesCustomerActionButtons } from './LocalSalesCustomerActionButtons';
import { useNavigate } from 'react-router-dom';
import { Collections, useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const DEFAULT_VALUES: LocalSalesCustomer = {
  uuid: '',
  id: '',
  firstName: '',
  lastName: '',
  address: '',
  birthday: null,
  phone1: '',
  phone2: '',
  email: '',
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  id: yup.string().required(),
  address: yup.string().required(),
  birthday: yup.date().required(),
  phone1: yup.string().required(),
});

export const LocalSalesCustomerForm = (props: {
  serialId: string;
  formMode: LocalSalesCustomerFormMode;
  editModeData?: LocalSalesCustomer;
}) => {
  const { serialId, editModeData, formMode } = props;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const LocalSalesCustomerForm = useForm<LocalSalesCustomer>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
    values: editModeData,
    resolver: yupResolver(schema),
  });

  const {
    mutate: handleCreateNewCustomer,
    isSuccess,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ['createNewCustomer'],
    mutationFn: () => setFirebaseData(Collections.LocalSalesCustomers, serialId, { ...getValues(), uuid: serialId }),
  });

  const { reset, getValues, handleSubmit } = LocalSalesCustomerForm;
  const { setFirebaseData } = useFirebaseDB();

  const handleReset = () => {
    reset(DEFAULT_VALUES);
    navigate('/local-sales/customers');
  };

  const handleCreateCustomer = () => handleCreateNewCustomer();

  const handleOpen = () => setOpen(true);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess || isError) handleOpen();
  }, [isError, isSuccess]);

  return (
    <FormProvider {...LocalSalesCustomerForm}>
      <Grid container rowSpacing={3} columnSpacing={12}>
        <LocalSalesCustomerNameControllers />
        <LocalSalesCustomerPersonalInfoControllers />
        <LocalSalesCustomerPhoneControllers />
        <LocalSalesCustomerAddressController />
        <LocalSalesCustomerActionButtons
          formMode={formMode}
          handleReset={handleReset}
          handleCreateCustomer={handleSubmit(handleCreateCustomer)}
        />
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          {isPending && <CircularProgress size={30} />}
        </Grid>
      </Grid>
      <Snackbar
        open={open && isSuccess}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
          onClose={handleClose}
          action={
            formMode === LocalSalesCustomerFormMode.CREATE && (
              <Stack direction="row" spacing={1}>
                <Button variant="contained" color="inherit" size="small" onClick={() => reset(DEFAULT_VALUES)}>
                  Ajouter un autre
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  onClick={() => navigate(`/local-sales/customers/edit/${serialId}`)}
                >
                  Voir
                </Button>
              </Stack>
            )
          }
        >
          {formMode === LocalSalesCustomerFormMode.CREATE
            ? 'Très bien, le nouveau client a été bien ajouté !'
            : 'Très bien, info a a été bien mofifié'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open && isError}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled" onClose={handleClose}>
          Mais non, quelque chose ne va pas !
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};
