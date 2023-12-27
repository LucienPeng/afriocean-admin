import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesFormMode, LocalSalesOrder } from '../../../../model/localSales.model';
import { Alert, CircularProgress, Grid, Snackbar } from '@mui/material';
import { LocalSalesOrderClientInfo } from './LocalSalesOrderClientInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Collections, useFirebaseDB } from '../../../../Utils/Firebase/useFirebaseDB';
import { useParams } from 'react-router-dom';
import { LocalSalesOrderProductsAccordionWrapper } from './LocalSalesOrderAccordion';
import { LocalSalesOrderPreview } from './LocalSalesOrderPreview';
import { getTotalAmount } from './LocalSalesOrderAccordion/useHandleOrderOperation';
import { useFirebaseFunctions } from '../../../../Utils/Firebase/useFirebaseFunctions';
import { useEffect, useMemo, useState } from 'react';
import { generateIncrementalId } from '../../../../Utils/incrementalId';
import { LocalSalesOrderActionButtons } from './LocalSalesOrderActionButtons';
import { LocalSalesOrderStatus } from './LocalSalesOrderStatus';

const schema = yup.object().shape({
  date: yup.string().required(),
  product: yup.array(yup.object().required()).min(1),
});

export const LocalSalesOrderFormWrapper = (props: { formMode: LocalSalesFormMode }) => {
  const [orderId, setOrderId] = useState('');
  const [customerInfo, setCustomerInfo] = useState<LocalSalesCustomer>();
  const [open, setOpen] = useState(false);
  const { formMode } = props;
  const { id } = useParams();
  const { getFirebaseDocumentData, setFirebaseData } = useFirebaseDB();
  const { createNewOrder } = useFirebaseFunctions();

  const { data: customerDetail } = useQuery({
    queryKey: ['customerDetail', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesCustomers, id as string).then((res) => {
        if (!res) throw Error('This customer is not exist');
        return { ...res, birthday: new Date(res?.birthday) } as LocalSalesCustomer;
      }),
    enabled: !!id && formMode === LocalSalesFormMode.CREATE,
    retry: false,
  });

  const { data: orderDetail } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: () =>
      getFirebaseDocumentData(Collections.LocalSalesOrders, id as string).then((res) => {
        return { ...res, date: new Date(res?.date) } as LocalSalesOrder;
      }),
    enabled: !!id && formMode === LocalSalesFormMode.EDIT,
    retry: false,
  });

  const { data: orderSerialId, refetch: refetchOrderSerialId } = useQuery({
    queryKey: ['getOrderSerialId'],
    queryFn: () => getFirebaseDocumentData(Collections.IncrementalCounter, 'LocalSalesOrders').then((res) => res),
    enabled: formMode === LocalSalesFormMode.CREATE,
  });

  const {
    mutate: callCreateNewOrder,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isPending: isCreatePending,
  } = useMutation({
    mutationKey: ['createNewOrder'],
    mutationFn: () =>
      createNewOrder({
        ...getValues(),
        customer: customerInfo,
        orderId,
        totalePrice: getTotalAmount(getValues('product')),
      }),
  });

  const DEFAULT_VALUES: LocalSalesOrder = useMemo(() => {
    return {
      product: [],
      date: new Date(),
      orderId: '',
      customer: customerInfo,
      totalePrice: 0,
      status: {
        delivered: false,
        paid: false,
      },
    };
  }, [customerInfo]);

  const LocalSalesOrderForm = useForm<LocalSalesOrder>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
    values: orderDetail,
    resolver: yupResolver(schema),
  });

  const { getValues, handleSubmit, reset } = LocalSalesOrderForm;

  const {
    mutate: callUpdateNewOrder,
    isSuccess: isEditSuccess,
    isError: isEditError,
    isPending: isEditPending,
  } = useMutation({
    mutationKey: ['updateNewOrder'],
    mutationFn: () =>
      setFirebaseData(Collections.LocalSalesOrders, orderId, {
        ...getValues(),
        customer: customerInfo,
        orderId,
        totalePrice: getTotalAmount(getValues('product')),
      }),
  });

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);

  const handleCreateOrder = () => callCreateNewOrder();
  const handleUpdateOrder = () => callUpdateNewOrder();

  useEffect(() => {
    if (orderDetail) {
      setCustomerInfo(orderDetail.customer);
    }
  }, [orderDetail]);

  useEffect(() => {
    if (customerDetail) {
      setCustomerInfo(customerDetail);
    }
  }, [customerDetail]);

  useEffect(() => {
    if (isCreateSuccess || isCreateError || isEditSuccess || isEditError) handleOpen();
  }, [isCreateError, isCreateSuccess, isEditError, isEditSuccess]);

  useEffect(() => {
    if (isCreateSuccess) {
      reset(DEFAULT_VALUES);
      refetchOrderSerialId();
    }
  }, [DEFAULT_VALUES, isCreateSuccess, refetchOrderSerialId, reset]);

  useEffect(() => {
    if (customerInfo && orderSerialId) {
      setOrderId(`${customerInfo.uuid}-${generateIncrementalId(orderSerialId.index.toString(), 4)}`);
    }
  }, [customerInfo, orderSerialId]);

  useEffect(() => {
    if (id && formMode === LocalSalesFormMode.EDIT) setOrderId(id);
  }, [formMode, id]);

  useEffect(() => {
    if (isEditSuccess) {
      reset(getValues(), { keepDirty: false });
    }
  }, [getValues, isEditSuccess, reset]);

  return (
    <FormProvider {...LocalSalesOrderForm}>
      {customerInfo && orderId ? (
        <Grid container rowSpacing={5} columnSpacing={12}>
          <LocalSalesOrderClientInfo customer={customerInfo} orderId={orderId} />
          <LocalSalesOrderProductsAccordionWrapper />
          <LocalSalesOrderPreview />
          <LocalSalesOrderStatus />

          <LocalSalesOrderActionButtons
            isCreatePending={isCreatePending || isEditPending}
            handleAction={
              formMode === LocalSalesFormMode.CREATE ? handleSubmit(handleCreateOrder) : handleSubmit(handleUpdateOrder)
            }
          />
        </Grid>
      ) : (
        <CircularProgress size={30} />
      )}
      <Snackbar
        open={(open && isCreateSuccess) || (open && isEditSuccess)}
        autoHideDuration={8000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled" onClose={handleClose}>
          {formMode === LocalSalesFormMode.CREATE
            ? 'Bravo, la commande a été bien passée !'
            : 'Parfait, la commande a été bien modifiée'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={(open && isCreateError) || (open && isEditError)}
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
