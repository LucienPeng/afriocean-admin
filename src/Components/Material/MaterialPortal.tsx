import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../Common/PageWrapper';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useFirebaseDB } from '../../useFirebaseDB';
import { useQuery } from 'react-query';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World', col3: '111' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'N° Index' },
  { field: 'col2', headerName: 'N° ERP' },
  { field: 'col3', headerName: 'materialName' },
  { field: 'col4', headerName: 'materialZhName' },
  { field: 'col5', headerName: 'spec' },
  { field: 'col6', headerName: 'Initiateur' },
  { field: 'col7', headerName: 'photo' },
  { field: 'col8', headerName: 'barcode' },
  { field: 'col9', headerName: 'Qrcode' },
];

export const MaterialPortal = () => {
  const { getFirebaseCollectionData } = useFirebaseDB();
  const { data, isLoading } = useQuery({
    queryKey: 'materialList',
    queryFn: () => getFirebaseCollectionData('Material'),
    onSuccess: (fetchedData) => console.log(fetchedData),
  });

  const navigate = useNavigate();

  return (
    <PageWrapper componentName="Matériaux" icon={<InventoryIcon />} containerMaxWidth="lg">
      <Stack width="100%" direction="column" spacing={5}>
        <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
          <StyledTextField placeholder="Search Material" />
          <Button variant="outlined" onClick={() => navigate('/material/create')}>
            Ajouter objets
          </Button>
        </Stack>
        <DataGrid autoHeight rows={rows} columns={columns} />
      </Stack>
    </PageWrapper>
  );
};
