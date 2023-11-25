import { Button, CircularProgress, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../Common/PageWrapper';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Collections, useFirebaseDB } from '../../useFirebaseDB';
import { useQuery } from 'react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMaterialRedux } from '../../useMaterialRedux';
import { materialActions } from '../../Store/Material/material-slice';
import { MaterialModel } from '../../model/material.model';
import { useState } from 'react';

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

const mapRows = (data: MaterialModel[]) => {
  return data.map((d, index) => {
    return { id: index, col1: d.serialIndex, col2: d.erpId, col3: d.materialName };
  });
};

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-row': {
    //backgroundColor: 'teal',
    '&:hover': {
      cursor: 'pointer',
      // backgroundColor: 'red !important',
    },
    '&:nth-child(odd)': {
      backgroundColor: 'grey',
    },
  },
  '& .MuiDataGrid-cell': {
    fontSize: '16px',
    textAlign: 'left',
  },
}));

export const MaterialPortal = () => {
  const [rows, setRows] = useState<MaterialModel[]>([]);
  const { getFirebaseCollectionData } = useFirebaseDB();
  const { dispatch } = useMaterialRedux();
  const { isLoading } = useQuery({
    queryKey: 'materialList',
    queryFn: () => getFirebaseCollectionData('Material'),
    onSuccess: (fetchedData) => {
      setRows((mapRows(fetchedData as any) as any) ?? []);
      dispatch(
        materialActions.setMaterial({
          itemCount: fetchedData?.length,
        }),
      );
    },
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
        <StyledDataGrid
          disableColumnFilter
          disableColumnMenu
          hideFooterSelectedRowCount
          slots={{
            loadingOverlay: CircularProgress,
          }}
          loading={isLoading}
          autoHeight
          rows={rows}
          columns={columns}
        />
      </Stack>
    </PageWrapper>
  );
};
