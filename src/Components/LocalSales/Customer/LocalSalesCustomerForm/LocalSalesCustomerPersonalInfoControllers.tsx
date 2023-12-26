import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesCustomerFormMode } from '../../../../model/localSales.model';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

export const LocalSalesCustomerPersonalInfoControllers = (props: { formMode: LocalSalesCustomerFormMode }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="birthday"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <DatePicker
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      required: true,
                      error: !!errors.birthday,
                    },
                  }}
                  label="Date de naissance"
                  value={value}
                  onChange={onChange}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="id"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                required
                error={!!errors.id}
                disabled={props.formMode === LocalSalesCustomerFormMode.EDIT}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                id="id"
                label="Numéro d'identité"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
