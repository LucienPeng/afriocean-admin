import { useFormContext } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesCustomerFormMode } from '../../../../model/localSales.model';
import { Button, Grid, Stack } from '@mui/material';

export const LocalSalesCustomerActionButtons = (props: {
  handleReset: () => void;
  handleCreateCustomer: () => void;
  formMode: LocalSalesCustomerFormMode;
}) => {
  const {
    formState: { isDirty },
  } = useFormContext<LocalSalesCustomer>();
  const { handleReset, handleCreateCustomer, formMode } = props;
  return (
    <Grid item xs={12} display="flex" justifyContent="center">
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="error" onClick={handleReset}>
          Anuler
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateCustomer} disabled={!isDirty}>
          {formMode === LocalSalesCustomerFormMode.CREATE ? 'Créer' : 'Editer'}
        </Button>
      </Stack>
    </Grid>
  );
};
