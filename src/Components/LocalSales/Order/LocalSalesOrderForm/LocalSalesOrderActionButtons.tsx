import { Button, CircularProgress, Grid, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { LocalSalesOrder } from '../../../../model/localSales.model';

interface ActionButtonProps {
  readonly isCreatePending: boolean;
  readonly handleAction: () => void;
}

export const LocalSalesOrderActionButtons = (props: ActionButtonProps) => {
  const { isCreatePending, handleAction } = props;
  const {
    watch,
    formState: { isDirty },
  } = useFormContext<LocalSalesOrder>();
  const disabled = watch('product').length === 0;

  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={2} justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="error">
          Annuler
        </Button>
        <Button variant="contained" onClick={handleAction} disabled={disabled || !isDirty}>
          Confirmer
        </Button>
      </Stack>
      {isCreatePending && <CircularProgress size={30} />}
    </Grid>
  );
};
