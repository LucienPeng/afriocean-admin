import { CardActionArea, Stack, Typography } from '@mui/material';
import { LocalSalesOrder } from '../../../model/localSales.model';
import { StyledPaper } from '../../Common/StyledUI/StyledPaper';
import { mapStatus } from '../../../Utils/mapStatus';
import { useNavigate } from 'react-router-dom';

interface LocalSalesOrderMobileCardProps {
  orders: LocalSalesOrder[];
}

export const LocalSalesOrderMobileCard = (props: LocalSalesOrderMobileCardProps) => {
  const { orders } = props;
  const navigate = useNavigate();
  const handleRedirect = (id: string) => navigate(`/local-sales/orders/edit/${id}`);

  return (
    <Stack spacing={1} overflow="scroll" height="58vh">
      {orders?.map((order) => (
        <StyledPaper key={order.orderId}>
          <CardActionArea
            sx={{ width: '100%', minHeight: '100px', p: 2 }}
            onClick={() => handleRedirect(order.orderId)}
          >
            <Stack direction="column" spacing={5} justifyContent="space-between">
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" color="text.primary">
                  {mapStatus(order.status)}
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {order.orderId}
                </Typography>
              </Stack>
              <Stack direction="column">
                <Typography variant="body1" color="text.primary">
                  {order.customer?.firstName} {order.customer?.lastName}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {order.customer?.address}
                </Typography>
              </Stack>
            </Stack>
          </CardActionArea>
        </StyledPaper>
      ))}
    </Stack>
  );
};
