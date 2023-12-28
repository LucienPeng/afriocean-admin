import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { LocalSalesOrder, OrderStatus } from '../../../../model/localSales.model';
import { useFormContext } from 'react-hook-form';
import { useEmailNotification } from '../../../../Utils/useEmailNotification';

export const LocalSalesOrderStatus = () => {
  const [open, setOpen] = useState(false);
  const { setValue, getValues, watch } = useFormContext<LocalSalesOrder>();
  const { sendDeliveryNotification } = useEmailNotification();
  const statusValue = watch('status');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(
      'status',
      {
        ...getValues('status'),
        [event.target.name]: event.target.checked,
      },
      { shouldDirty: true },
    );
    if (event.target.name === 'delivered' && event.target.checked) {
      handleClickOpen();
    }
  };

  const handleSendNotification = () => {
    const customerInfo = getValues('customer');
    const orderInfo = getValues();

    sendDeliveryNotification({
      firstName: customerInfo?.firstName ?? '',
      lastName: customerInfo?.lastName ?? '',
      orderId: orderInfo.orderId,
    });
    handleClose();
  };

  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
      <Stack direction="row" alignItems="center" width="100%" spacing={2}>
        <Typography variant="h6" fontWeight={700} color="text.primary" p={2}>
          État de la commande :
        </Typography>
        <Stack direction="column">
          <FormControlLabel
            control={<Checkbox checked={statusValue?.delivered ?? false} onChange={handleChange} name="delivered" />}
            label={OrderStatus.Delivered}
          />
          <FormControlLabel
            control={<Checkbox checked={statusValue?.paid ?? false} onChange={handleChange} name="paid" />}
            label={OrderStatus.Paid}
          />
        </Stack>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Attention</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Une notification sera envoyée au client ainsi qu&apos;à l&apos;administrateur s&apos;il est confirmé..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="error">
            Non
          </Button>
          <Button onClick={handleSendNotification} variant="outlined">
            D&apos;accord
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
