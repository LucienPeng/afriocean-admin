import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { Currency, MaterialModel, Warehouse } from '../../../model/material.model';

interface MaterialItemFormDetailControllersProps {
  readonly disabled: boolean;
}

const CURRENCY_VALUE = Object.values(Currency).filter((currency) => isNaN(Number(currency)));
const WAREHOUSE_VALUE = Object.values(Warehouse).filter((warehouse) => isNaN(Number(warehouse)));

export const MaterialItemFormDetailControllers = (props: MaterialItemFormDetailControllersProps) => {
  const { disabled } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<MaterialModel>();

  return (
    <Grid item xs={12}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Controller
                name="spec"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    error={!!errors.spec}
                    disabled={disabled}
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="spec"
                    label="Spécification"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="defaultWarehouse"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="none">
                    <InputLabel id="role-label">Magasin</InputLabel>
                    <Select
                      error={!!errors.defaultWarehouse}
                      disabled={disabled}
                      variant="outlined"
                      fullWidth
                      labelId="warehouse"
                      id="warehouse"
                      onChange={onChange}
                      value={value}
                    >
                      {WAREHOUSE_VALUE.map((warehouse) => (
                        <MenuItem key={warehouse} value={warehouse}>
                          {warehouse}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <Controller
                name="brand"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    error={!!errors.brand}
                    disabled={disabled}
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="brand"
                    label="Marque"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    error={!!errors.price}
                    disabled={disabled}
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="price"
                    label="Prix"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="currency"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="none">
                    <InputLabel id="role-label">Devise</InputLabel>
                    <Select
                      error={!!errors.currency}
                      disabled={disabled}
                      variant="outlined"
                      fullWidth
                      labelId="currency"
                      id="currency"
                      onChange={onChange}
                      value={value}
                    >
                      {CURRENCY_VALUE.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="defaultQuantity"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    error={!!errors.defaultQuantity}
                    disabled={disabled}
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="quantity"
                    label="Default Quantité"
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
