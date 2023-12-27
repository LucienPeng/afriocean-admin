import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { LocalSalesOrder } from '../../../../model/localSales.model';
import { useFirebaseFunctions } from '../../../../Utils/Firebase/useFirebaseFunctions';
import { mapStatus } from '../../../../Utils/mapStatus';

interface LocalSalesCustomerTableProps {
  rows: LocalSalesOrder[] | undefined;
  columns: GridColDef[];
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const useLocalCustomerOrderTable = (customerId: string | undefined): LocalSalesCustomerTableProps => {
  const { getCustomerOrder } = useFirebaseFunctions();
  const {
    data: rows,
    isFetching,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['customerOrderList', customerId],
    queryFn: () =>
      getCustomerOrder({ id: customerId })
        .then((res) => {
          const localSalesOrders = res.data as LocalSalesOrder[];
          const ordersWithId = localSalesOrders.map((order, index) => {
            return { ...order, id: index.toString() };
          });
          return ordersWithId;
        })
        .catch(() => []),
    retry: false,
    enabled: !!customerId,
  });

  const columns: GridColDef[] = [
    {
      field: 'orderId',
      headerName: 'Nº commande',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },

    {
      field: 'date',
      headerName: 'Date de commande',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },

    {
      field: 'status',
      headerName: 'État',
      headerAlign: 'center',
      valueGetter: (params) => mapStatus(params.row.status),
      align: 'center',
      flex: 1,
    },
  ];

  return { columns, rows, isLoading, isFetching, isSuccess };
};
