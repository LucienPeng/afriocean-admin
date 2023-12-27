import { IconButton, Stack, Typography } from '@mui/material';
import { LocalSalesOrder, Product } from '../../../../../model/localSales.model';
import { useFormContext } from 'react-hook-form';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const LocalSalesOrderPreviewSectionContent = (props: { product: Product }) => {
  const { product } = props;
  const { setValue, watch } = useFormContext<LocalSalesOrder>();

  const productList = watch('product');

  const handleRemove = (item: Product) => {
    const newE = productList.filter((r) => r !== item);
    setValue('product', newE);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={2}>
      <Typography variant="h6" fontWeight={700} color="text.primary">
        {product.variant}
      </Typography>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" spacing={5}>
          <Typography variant="body1" color="text.primary">
            {product.spec}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {product.quantity}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {product.price} CFA
          </Typography>
          <Typography variant="body1" fontWeight={700} color="text.primary">
            {product.quantity * product.price} CFA
          </Typography>
        </Stack>
        <IconButton sx={{ ml: 3 }} color="error" aria-label="remove-fataya" onClick={() => handleRemove(product)}>
          <RemoveCircleIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
