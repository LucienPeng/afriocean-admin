import { Grid } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { MaterialModel } from '../../../model/material.model';

interface MaterialItemFormTitleControllersProps {
  readonly disabled: boolean;
}

export const MaterialItemFormTitleControllers = (props: MaterialItemFormTitleControllersProps) => {
  const { disabled } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialModel>();

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="materialName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                error={!!errors.materialName}
                fullWidth
                disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="materialName"
                label="Titre"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="materialZhName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="materialZhName"
                label="Titre en chinois"
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
