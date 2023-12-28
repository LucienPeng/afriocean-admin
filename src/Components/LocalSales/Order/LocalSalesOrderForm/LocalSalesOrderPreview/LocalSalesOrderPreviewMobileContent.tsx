import { Stack, Typography } from '@mui/material';
import { Product } from '../../../../../model/localSales.model';

export const LocalSalesOrderPreviewMobileContent = (props: { product: Product }) => {
  const { product } = props;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      px={1}
      py={2}
      gap={2}
      textAlign="center"
    >
      <Typography variant="body1" noWrap fontWeight={700} color="text.primary">
        {product.variant}
      </Typography>
      <Typography variant="caption" noWrap color="text.primary">
        {product.spec}
      </Typography>
      <Typography variant="caption" color="text.primary">
        {product.quantity}
      </Typography>
      <Typography variant="caption" color="text.primary">
        {product.price} CFA
      </Typography>
      <Typography variant="caption" fontWeight={700} color="text.primary">
        {product.quantity * product.price} CFA
      </Typography>
    </Stack>
  );
};
