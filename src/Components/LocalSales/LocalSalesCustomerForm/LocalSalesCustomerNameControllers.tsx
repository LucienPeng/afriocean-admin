import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';

export const LocalSalesCustomerNameControllers = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.firstName}
                //disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="firstName"
                label="Prénom"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.lastName}
                //disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="lastName"
                label="Nom"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
