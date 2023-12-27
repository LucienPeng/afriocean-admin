import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ItemCategory, LocalSalesOrder, Product } from '../../../../model/localSales.model';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { LocalSalesOrderPreviewSection } from './LocalSalesOrderPreviewSection';

export const LocalSalesOrderPreview = () => {
  const { watch } = useFormContext<LocalSalesOrder>();
  const productList = watch('product');
  const fataya = productList?.filter((p) => p.category === ItemCategory.Fataya);
  const poudrePoisson = productList?.filter((f) => f.category === ItemCategory.PoudreDePoisson);

  const fatayaSubtotal: number = fataya.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  const poudrePoissonSubtotal: number = poudrePoisson.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);

  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={1}>
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
        <Stack>
          <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
            Fataya
          </Typography>
          <Stack>
            {fataya.map((f, inx) => (
              <LocalSalesOrderPreviewSection key={inx} product={f} />
            ))}
            <Typography variant="h5" fontWeight={700} color="text.primary" alignSelf="flex-end" p={2}>
              Subtotal : {fatayaSubtotal} CFA
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ mx: 3, my: 1 }} />
        <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
          Poudre de poisson
        </Typography>
        <Stack>
          {poudrePoisson.map((p, inx) => (
            <LocalSalesOrderPreviewSection key={inx} product={p} />
          ))}
          <Typography variant="h5" fontWeight={700} color="text.primary" alignSelf="flex-end" p={2}>
            Subtotal : {poudrePoissonSubtotal} CFA
          </Typography>
          <Divider sx={{ mx: 3, my: 1 }} />
          <Typography variant="h4" fontWeight={700} color="text.primary" alignSelf="flex-end" p={2}>
            Grand Total : {poudrePoissonSubtotal + fatayaSubtotal} CFA
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
};
