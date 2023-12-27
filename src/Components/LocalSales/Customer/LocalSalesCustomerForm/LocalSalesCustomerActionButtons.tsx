import { useFormContext } from 'react-hook-form';
import { LocalSalesCustomer, LocalSalesFormMode } from '../../../../model/localSales.model';
import { Button, Grid, Stack } from '@mui/material';
export const LocalSalesCustomerActionButtons = (props: {
  handleReset: () => void;
  handleCustomerAction: () => void;
  formMode: LocalSalesFormMode;
}) => {
  const {
    formState: { isDirty },
  } = useFormContext<LocalSalesCustomer>();
  const { handleReset, handleCustomerAction, formMode } = props;
  return (
    <Grid item xs={12} display="flex" justifyContent="center">
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="error" onClick={handleReset}>
          Anuler
        </Button>
        <Button variant="contained" color="primary" onClick={handleCustomerAction} disabled={!isDirty}>
          {formMode === LocalSalesFormMode.CREATE ? 'Créer' : 'Editer'}
        </Button>
      </Stack>
    </Grid>
  );
};
