import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { GridColDef } from '@mui/x-data-grid';
import { LocalSalesOrder } from '../../../model/localSales.model';
import { mapStatus } from '../../../Utils/mapStatus';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { DATE_FORMAT } from '../../../model/application.model';

interface LocalSalesCustomerTableProps {
  rows: LocalSalesOrder[] | undefined;
  columns: GridColDef[];
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const useLocalSalesorderTable = (): LocalSalesCustomerTableProps => {
  const { getFirebaseCollectionData } = useFirebaseDB();
  const {
    data: rows,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['getLocalSalesOrderList'],
    queryFn: () =>
      getFirebaseCollectionData(Collections.LocalSalesOrders).then((res) => res as unknown as LocalSalesOrder[]),
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
      field: 'client',
      headerName: 'Client',
      valueGetter: (params) => `${params.row.customer?.firstName} ${params.row.customer?.lastName}`,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date de commande',
      valueGetter: (params) => moment(params.row.date).format(DATE_FORMAT),
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'État',
      valueGetter: (params) => mapStatus(params.row.status),
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
  ];

  return { columns, rows, isLoading, isFetching, isSuccess };
};
