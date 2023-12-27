import { Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { LocalSalesOrder, OrderStatus } from '../../../../model/localSales.model';
import { useFormContext } from 'react-hook-form';
import { LocalSalesOrders } from '..';

export const LocalSalesOrderStatus = () => {
  const { setValue, getValues, watch } = useFormContext<LocalSalesOrder>();
  const statusValue = watch('status');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('status', {
      ...getValues('status'),
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
      <Stack direction="row" alignItems="center" width="100%" spacing={2}>
        <Typography variant="h6" fontWeight={700} color="text.primary" p={2}>
          État de la commande :
        </Typography>
        <Stack direction="column">
          <FormControlLabel
            control={<Checkbox checked={statusValue?.delivered} onChange={handleChange} name="delivered" />}
            label={OrderStatus.Delivered}
          />
          <FormControlLabel
            control={<Checkbox checked={statusValue?.paid} onChange={handleChange} name="paid" />}
            label={OrderStatus.Paid}
          />
        </Stack>
      </Stack>
    </Grid>
  );
};
