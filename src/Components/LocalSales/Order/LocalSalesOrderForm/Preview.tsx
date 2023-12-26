import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ItemCategory, LocalSalesOrder, Product } from '../../../../model/localSales.model';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
export const Preview = () => {
  const { getValues, setValue, watch } = useFormContext<LocalSalesOrder>();
  const list = watch('product');
  const fataya = list?.filter((r) => r.category === ItemCategory.Fataya);

  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={1}>
      {fataya && (
        <Stack
          sx={{
            width: '100%',
            minHeight: '30vh',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: '8px',
          }}
          direction="column"
        >
          <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
            Fataya
          </Typography>
          <Stack>
            {list.map((f, inx) => (
              <Stack key={inx} direction="row" spacing={5}>
                <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
                  {f.category}
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
                  {f.spec}
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
                  {f.quantity}
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
                  {f.price}
                </Typography>
                <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
                  {f.quantity * f.price}
                </Typography>
                <IconButton sx={{ ml: 3 }} color="error" aria-label="remove-fataya">
                  <RemoveCircleIcon />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Typography variant="h5" fontWeight={700} color="text.primary" p={2} alignSelf="flex-end">
            Subtotal
          </Typography>
          <Divider />
        </Stack>
      )}
    </Grid>
  );
};
