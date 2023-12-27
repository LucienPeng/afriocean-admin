import { Stack, Typography } from '@mui/material';
import { Product } from '../../../../../model/localSales.model';
import { LocalSalesOrderPreviewSectionContent } from './LocalSalesOrderPreviewSectionContent';

interface OrderPreviewProps {
  readonly title: string;
  readonly subTotal: number;
  readonly product: Product[];
}

export const LocalSalesOrderPreviewSection = (props: OrderPreviewProps) => {
  const { title, subTotal, product } = props;

  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
        {title}
      </Typography>
      <Stack>
        {product.map((f, inx) => (
          <LocalSalesOrderPreviewSectionContent key={inx} product={f} />
        ))}
        <Typography variant="h5" fontWeight={700} color="text.primary" alignSelf="flex-end" p={2}>
          Subtotal : {subTotal} CFA
        </Typography>
      </Stack>
    </Stack>
  );
};
