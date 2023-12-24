import { Controller, useFormContext } from 'react-hook-form';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import { Button, Grid, Stack } from '@mui/material';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';

export const LocalSalesCustomerActionButtons = (props: {
  handleReset: () => void;
  handleCreateCustomer: () => void;
}) => {
  const { handleReset, handleCreateCustomer } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext<LocalSalesCustomer>();

  return (
    <Grid item xs={12} display="flex" justifyContent="center">
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="error" onClick={handleReset}>
          Anuler
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateCustomer}>
          Créer
        </Button>
      </Stack>
    </Grid>
  );
};
