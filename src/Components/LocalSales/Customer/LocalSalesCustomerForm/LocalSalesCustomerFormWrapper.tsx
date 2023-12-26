import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesFormMode } from '../../../../model/localSales.model';
import { Alert, Button, CircularProgress, Grid, Snackbar, Stack, Typography } from '@mui/material';
import { LocalSalesCustomerNameControllers } from './LocalSalesCustomerNameControllers';
import { LocalSalesCustomerAddressController } from './LocalSalesCustomerAddressController';
import { LocalSalesCustomerPhoneControllers } from './LocalSalesCustomerPhoneControllers';
import { LocalSalesCustomerPersonalInfoControllers } from './LocalSalesCustomerPersonalInfoControllers';
import { LocalSalesCustomerActionButtons } from './LocalSalesCustomerActionButtons';
import { useNavigate } from 'react-router-dom';
import { Collections, useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFirebaseFunctions } from '../../../../Utils/Firebase/useFirebaseFunctions';
import AddCircleIcon from '@mui/icons-material/AddCircle';

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

export const LocalSalesCustomerFormWrapper = (props: {
  serialId: string;
  formMode: LocalSalesFormMode;
  editModeData?: LocalSalesCustomer;
  refetchSerialId: () => void;
}) => {
  const { serialId, editModeData, formMode, refetchSerialId } = props;
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const LocalSalesCustomerForm = useForm<LocalSalesCustomer>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
    values: editModeData,
    resolver: yupResolver(schema),
  });

  const {
    mutate: callCreateNewCustomer,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isPending: isCreatePending,
    error,
  } = useMutation({
    mutationKey: ['createNewCustomer'],
    mutationFn: () => createNewCustomer({ ...getValues(), uuid: serialId }),
  });

  const {
    mutate: callUpdateNewCustomer,
    isSuccess: isEditSuccess,
    isError: isEditError,
    isPending: isEditPending,
  } = useMutation({
    mutationKey: ['updateNewCustomer'],
    mutationFn: () =>
      setFirebaseData(Collections.LocalSalesCustomers, serialId, {
        ...getValues(),
        birthday: getValues('birthday')?.toISOString(),
      }),
  });

  const { reset, getValues, handleSubmit } = LocalSalesCustomerForm;
  const { setFirebaseData } = useFirebaseDB();
  const { createNewCustomer } = useFirebaseFunctions();

  const handleReset = () => {
    reset(DEFAULT_VALUES);
    navigate('/local-sales/customers');
  };

  const handleCreateCustomerInfo = () => callCreateNewCustomer();
  const handleUpdateCustomerInfo = () => callUpdateNewCustomer();

  const handleOpen = () => setOpen(true);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isCreateSuccess || isCreateError || isEditSuccess || isEditError) handleOpen();
  }, [isCreateError, isCreateSuccess, isEditError, isEditSuccess]);

  useEffect(() => {
    if (isCreateSuccess) {
      reset(DEFAULT_VALUES);
      refetchSerialId();
    }
  }, [isCreateSuccess, refetchSerialId, reset]);

  useEffect(() => {
    if (isEditSuccess) {
      reset(getValues(), { keepDirty: false });
    }
  }, [getValues, isEditSuccess, reset]);

  return (
    <FormProvider {...LocalSalesCustomerForm}>
      <Grid container rowSpacing={3} columnSpacing={12}>
        <Grid item xs={12}>
          <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              color="text.primary"
              mb={2}
              fontWeight={700}
              textAlign="left"
              display="flex"
              alignItems="center"
              gap={2}
            >
              Client Id: {!serialId ? <CircularProgress size={20} /> : serialId}
            </Typography>
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate(`/local-sales/orders/create/${serialId}`)}
              startIcon={<AddCircleIcon />}
              sx={{ alignSelf: 'flex-end', flex: 'none' }}
            >
              Passer commande
            </Button>
          </Stack>
        </Grid>
        <LocalSalesCustomerNameControllers />
        <LocalSalesCustomerPersonalInfoControllers formMode={formMode} />
        <LocalSalesCustomerPhoneControllers />
        <LocalSalesCustomerAddressController />
        <LocalSalesCustomerActionButtons
          formMode={formMode}
          handleReset={handleReset}
          handleCreateCustomer={
            formMode === LocalSalesFormMode.CREATE
              ? handleSubmit(handleCreateCustomerInfo)
              : handleSubmit(handleUpdateCustomerInfo)
          }
        />
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
          {isCreatePending || (isEditPending && <CircularProgress size={30} />)}
        </Grid>
      </Grid>
      <Snackbar
        open={(open && isCreateSuccess) || (open && isEditSuccess)}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled" onClose={handleClose}>
          {formMode === LocalSalesFormMode.CREATE
            ? 'Très bien, le nouveau client a été bien ajouté !'
            : "Très bien, l'info du client a été bien modifié !"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={(open && isCreateError) || (open && isEditError)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: '100%' }} variant="filled" onClose={handleClose}>
          {error?.message.includes('Dublicated customer')
            ? 'Le client est déjà enregistré dans le base donné'
            : 'Mais non, quelque chose ne va pas !'}
        </Alert>
      </Snackbar>
    </FormProvider>
  );
};
