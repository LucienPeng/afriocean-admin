import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../../model/localSales.model';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';

export const LocalSalesCustomerPhoneControllers = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="phone1"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.phone1}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="phone1"
                label="Numéro téléphone (1)"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="phone2"
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                error={!!errors.phone2}
                //disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                id="phone2"
                label="Numéro téléphone (2)"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
