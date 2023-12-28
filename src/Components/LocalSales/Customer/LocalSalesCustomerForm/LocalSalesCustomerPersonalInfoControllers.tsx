import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesFormMode } from '../../../../model/localSales.model';
import { Grid } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';
import fr from 'date-fns/locale/fr';

export const LocalSalesCustomerPersonalInfoControllers = (props: { formMode: LocalSalesFormMode }) => {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  const handleCustomChange = (value: Date | null) => {
    if (value) {
      setValue('birthday', value.toISOString());
    }
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="birthday"
            control={control}
            rules={{ required: true }}
            render={({ field: { value } }) => (
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
                  value={parseISO(value)}
                  onChange={(newValue) => handleCustomChange(newValue)}
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
                disabled={props.formMode === LocalSalesFormMode.EDIT}
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
