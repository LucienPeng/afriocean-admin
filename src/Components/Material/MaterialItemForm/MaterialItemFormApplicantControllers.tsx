import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { MaterialModel } from '../../../model/material.model';
import { Department } from '../../../model/company.model';

interface MaterialItemFormApplicantControllersProps {
  readonly disabled: boolean;
}

const DEPARTMENT_VALUE = Object.values(Department).filter((operation) => isNaN(Number(operation)));

export const MaterialItemFormApplicantControllers = (props: MaterialItemFormApplicantControllersProps) => {
  const { disabled } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialModel>();

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item xs={6}>
          <Controller
            name="initiateur"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                error={!!errors.initiateur}
                fullWidth
                disabled={disabled}
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="initiateur"
                label="Initiateur"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth margin="none">
                <InputLabel id="departments-label">Department</InputLabel>
                <Select
                  error={!!errors.department}
                  variant="outlined"
                  fullWidth
                  labelId="role-label"
                  id="role"
                  onChange={onChange}
                  value={value}
                  label="Département"
                  disabled={disabled}
                >
                  {DEPARTMENT_VALUE.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
