import { useQuery } from '@tanstack/react-query';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMaterialRedux } from '../../useMaterialRedux';
import { useFirebaseDB } from '../../Utils/Firebase/useFirebaseDB';
import { PageWrapper } from '../Common/PageWrapper';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { materialActions } from '../../Store/Material/material-slice';
import { MaterialTableRow } from '../../model/material.model';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { PageSection } from '../Common/PageSection';
import { useSearchKeywords } from '../../Utils/useSearchKeywords';
import { StyledSearchTextField } from '../Common/StyledUI/StyledSearchTextField';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useHandleLoading } from '../../Utils/useHandleLoading';

const materialItemColumns: GridColDef[] = [
  { field: 'id', headerName: 'N° Index', flex: 1 },
  { field: 'itemId', headerName: 'N° Article', flex: 1 },
  { field: 'erpId', headerName: 'N° ERP' },
  { field: 'materialName', headerName: 'Titre', flex: 1 },
  { field: 'materialZhName', headerName: 'Titre Chinois', flex: 1 },
  { field: 'spec', headerName: 'Spécification', flex: 1 },
  { field: 'initiateur', headerName: 'Initiateur' },
  { field: 'totalQuantity', headerName: 'Stock Total', flex: 1 },
];

// const mapMaterialItemRows = (data: MaterialModel[]): MaterialTableRow[] => {
//   return data.map((d) => {
//     return {
//       id: d.id ?? '',
//       itemId: d.itemId,
//       erpId: d.erpId,
//       materialName: d.materialName,
//       materialZhName: d.materialZhName,
//       initiateur: d.initiateur,
//       spec: d.spec,
//       totalQuantity: d.totalQuantity,
//     };
//   });
// };

export const MaterialPortal = () => {
  const rawData = useRef<MaterialTableRow[]>([]);
  const [rows, setRows] = useState<MaterialTableRow[]>(rawData.current);
  const { setIsLoading: setIsFiltering } = useHandleLoading();
  const { dispatch } = useMaterialRedux();
  const { getFirebaseCollectionData } = useFirebaseDB();
  const { keywords, setKeywords } = useSearchKeywords();

  const { isLoading, isFetching } = useQuery({
    queryKey: ['materialList'],
    queryFn: () => getFirebaseCollectionData('Material'),
    // onSuccess: (fetchedData) => {
    //   setRows(mapMaterialItemRows(fetchedData as MaterialModel[]));
    //   rawData.current = mapMaterialItemRows(fetchedData as MaterialModel[]);
    // },
  });
  const navigate = useNavigate();

  const handleRedirect = useCallback(
    (material: MaterialTableRow) => {
      dispatch(materialActions.selectMaterial({ selectedMaterialItem: material }));
      navigate(`/material/${material.id}`);
    },
    [dispatch, navigate],
  );

  const handleCreateNewMaterial = useCallback(() => navigate(`/material/create/${keywords}`), [navigate, keywords]);

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const existedRow = rawData.current.find((row) => row.itemId.toLowerCase() === keywords.toLowerCase());
        console.log('existedRow', existedRow);
        if (existedRow) {
          console.log('TRIGGERED');
          handleRedirect(existedRow);
        } else if (keywords !== '' && !existedRow) {
          handleCreateNewMaterial();
        }
      }
    },
    [handleRedirect, handleCreateNewMaterial, keywords],
  );

  const LoadingOverlay = () => {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center" my={10}>
        <CircularProgress color="secondary" />
      </Stack>
    );
  };

  const NoRowsOverlay = () => {
    return (
      <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" my={5}>
        <Typography>Désolé, pas de résultat trouvé.</Typography>
        <Button variant="outlined" onClick={handleCreateNewMaterial}>
          Créer un nouveau
        </Button>
      </Stack>
    );
  };

  useEffect(() => {
    if (keywords !== '') {
      setIsFiltering(true);
      const filteredRows = rawData.current.filter((row) => {
        return row.itemId.toLowerCase().includes(keywords.toLowerCase());
      });
      setRows(filteredRows);
      setIsFiltering(false);
    } else {
      setRows(rawData.current);
    }
  }, [keywords, handleRedirect, setIsFiltering]);

  return (
    <PageWrapper componentName="Matériaux" icon={<InventoryIcon />} containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" direction="column" spacing={5}>
          <StyledSearchTextField
            id="material-search-bar"
            keywords={keywords}
            setKeywords={setKeywords}
            placeholder="Cherchez ou créez un material par numéro d'article"
            onKeyDownHandler={onKeyDownHandler}
          />

          <DataGridComponent
            isLoading={isLoading || isFetching}
            rows={rows}
            columns={materialItemColumns}
            onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row)}
            // noRowsOverlayHandler={handleRedirect}
            LoadingOverlay={LoadingOverlay}
            NoRowsOverlay={NoRowsOverlay}
          />
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
