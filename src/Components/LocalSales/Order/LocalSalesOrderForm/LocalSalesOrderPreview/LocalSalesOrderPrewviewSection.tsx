import { Stack, Typography } from '@mui/material';
import { Product } from '../../../../../model/localSales.model';
import { LocalSalesOrderPreviewDesktopContent } from './LocalSalesOrderPreviewDesktopContent';
import { useDeviceMetadata } from '../../../../Common/DeviceMetadataProvider';
import { LocalSalesOrderPreviewMobileContent } from './LocalSalesOrderPreviewMobileContent';

interface OrderPreviewProps {
  readonly title: string;
  readonly subTotal: number;
  readonly product: Product[];
}

export const LocalSalesOrderPreviewSection = (props: OrderPreviewProps) => {
  const { title, subTotal, product } = props;
  const { isMobileView } = useDeviceMetadata();
  return (
    <Stack>
      <Typography variant="h5" fontWeight={700} color="text.primary" p={2}>
        {title}
      </Typography>
      <Stack>
        {product.length === 0 ? (
          <Typography variant="body1" color="text.primary" fontWeight={700} p={2}>
            Neant
          </Typography>
        ) : isMobileView ? (
          product.map((f, inx) => <LocalSalesOrderPreviewMobileContent key={inx} product={f} />)
        ) : (
          product.map((f, inx) => <LocalSalesOrderPreviewDesktopContent key={inx} product={f} />)
        )}

        <Typography
          variant={isMobileView ? 'h6' : 'h5'}
          fontWeight={700}
          color="text.primary"
          alignSelf="flex-end"
          p={2}
        >
          Subtotal : {subTotal} CFA
        </Typography>
      </Stack>
    </Stack>
  );
};
