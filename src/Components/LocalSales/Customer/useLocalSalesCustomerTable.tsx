import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { useQuery } from '@tanstack/react-query';
import { GridColDef } from '@mui/x-data-grid';
import { LocalSalesCustomer } from '../../../model/localSales.model';

interface fff {
  rows: LocalSalesCustomer[] | undefined;
  columns: GridColDef[];
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

export const useLocalSalesCustomerTable = (): fff => {
  const { getFirebaseCollectionData } = useFirebaseDB();
  const {
    data: rows,
    isLoading,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['getLocalSalesCustomerList'],
    queryFn: () =>
      getFirebaseCollectionData(Collections.LocalSalesCustomers).then((res) => res as LocalSalesCustomer[]),
  });

  const columns: GridColDef[] = [
    {
      field: 'uuid',
      headerName: 'Nº ref',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'id',
      headerName: 'Nº Identité',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'firstName',
      headerName: 'Prénom',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'lastName',
      headerName: 'Nom',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'phone1',
      headerName: 'Nº Tel',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'phone2',
      headerName: 'Nº Tel',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
  ];

  return { columns, rows, isLoading, isFetching, isSuccess };
};
