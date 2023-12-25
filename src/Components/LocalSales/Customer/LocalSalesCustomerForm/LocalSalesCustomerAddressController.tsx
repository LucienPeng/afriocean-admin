import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../../model/localSales.model';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';

export const LocalSalesCustomerAddressController = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.address}
                //disabled={disabled}
                onChange={onChange}
                variant="standard"
                margin="normal"
                required
                id="address"
                label="Adress"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.email}
                //disabled={disabled}
                onChange={onChange}
                variant="standard"
                margin="normal"
                id="email"
                label="Email"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
