import { Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { MaterialModel } from '../../../model/material.model';

interface MaterialItemFormIdControllersProps {
  readonly disabled: boolean;
}

export const MaterialItemFormIdControllers = (props: MaterialItemFormIdControllersProps) => {
  const { disabled } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialModel>();

  return (
    <Grid item xs={12}>
      <Grid container columnSpacing={3} alignItems="center">
        <Grid item xs={6}>
          <Controller
            name="itemId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                autoComplete="off"
                fullWidth
                error={!!errors.itemId}
                disabled={disabled}
                onChange={onChange}
                variant="standard"
                margin="normal"
                required
                id="itemId"
                label="N° Article :"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="erpId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                disabled={disabled}
                onChange={onChange}
                variant="standard"
                margin="normal"
                id="erpId"
                label="N° ERP :"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
