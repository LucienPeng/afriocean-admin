import { Divider, Grid, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ItemCategory, LocalSalesOrder } from '../../../../../model/localSales.model';
import { LocalSalesOrderPreviewSectionContent } from './LocalSalesOrderPreviewSectionContent';
import { LocalSalesOrderPreviewSection } from './LocalSalesOrderPrewviewSection';

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
        <LocalSalesOrderPreviewSection title="Fataya" product={fataya} subTotal={fatayaSubtotal} />
        <Divider sx={{ mx: 3, my: 1 }} />
        <LocalSalesOrderPreviewSection
          title="Poudre de poisson"
          product={poudrePoisson}
          subTotal={poudrePoissonSubtotal}
        />
        <Divider sx={{ mx: 3, my: 1 }} />
        <Typography variant="h4" fontWeight={700} color="text.primary" alignSelf="flex-end" p={2}>
          Grand Total : {poudrePoissonSubtotal + fatayaSubtotal} CFA
        </Typography>
      </Stack>
    </Grid>
  );
};
