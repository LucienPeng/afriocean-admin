import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaterialRedux } from '../../useMaterialRedux';
import { useFirebaseDB } from '../../useFirebaseDB';
import { PageWrapper } from '../Common/PageWrapper';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { materialActions } from '../../Store/Material/material-slice';
import { MaterialModel, MaterialTableRow } from '../../model/material.model';
import { Button, Stack } from '@mui/material';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { PageSection } from '../Common/PageSection';
import InventoryIcon from '@mui/icons-material/Inventory';

const materialItemColumns: GridColDef[] = [
  { field: 'id', headerName: 'N° Index' },
  { field: 'erpId', headerName: 'N° ERP' },
  { field: 'materialName', headerName: 'Titre' },
  { field: 'materialZhName', headerName: 'Titre Chinois' },
  { field: 'spec', headerName: 'Spécification' },
  { field: 'initiateur', headerName: 'Initiateur' },
  { field: 'photo', headerName: 'Photo' },
  { field: 'quantity', headerName: 'Quantité' },
];

const mapMaterialItemRows = (data: MaterialModel[]): MaterialTableRow[] => {
  return data.map((d) => {
    return {
      id: d.id ?? '',
      erpId: d.erpId,
      materialName: d.materialName,
      materialZhName: d.materialZhName,
      spec: d.spec,
      photo: d.photo,
      quantity: d.quantity,
    };
  });
};

export const MaterialPortal = () => {
  const [rows, setRows] = useState<MaterialTableRow[]>([]);
  const { dispatch } = useMaterialRedux();
  const { getFirebaseCollectionData } = useFirebaseDB();

  const { isLoading } = useQuery({
    queryKey: 'materialList',
    queryFn: () => getFirebaseCollectionData('Material'),
    onSuccess: (fetchedData) => {
      setRows(mapMaterialItemRows(fetchedData as MaterialModel[]));
      dispatch(
        materialActions.setMaterial({
          itemCount: fetchedData?.length,
        }),
      );
    },
  });

  const navigate = useNavigate();

  const redirect = (material: MaterialTableRow) => {
    dispatch(materialActions.selectMaterial({ selectedMaterialItem: material }));
    navigate(`/material/${material.id}`);
  };

  return (
    <PageWrapper componentName="Matériaux" icon={<InventoryIcon />} containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" direction="column" spacing={5}>
          <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
            <StyledTextField placeholder="Cherche Material" />
            <Button variant="outlined" onClick={() => navigate('/material/create')}>
              Ajouter objets
            </Button>
          </Stack>
          <DataGridComponent
            isLoading={isLoading}
            rows={rows}
            columns={materialItemColumns}
            onCellClickHandler={(params: GridCellParams) => redirect(params.row)}
          />
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
