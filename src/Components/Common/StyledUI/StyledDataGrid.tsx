import { CircularProgress, styled } from '@mui/material';
import { Stack } from '@mui/system';
import { DataGrid, GridCellParams, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)((themeOptions) => ({
  width: '100%',
  '& .MuiDataGrid-row': {
    '&:hover': {
      cursor: 'pointer',
    },
    '&:nth-of-type(odd)': {
      backgroundColor: themeOptions.theme.palette.grey[100],
    },
  },
  '& .MuiDataGrid-cell': {
    fontSize: '16px',
    textAlign: 'left',
  },
}));

interface DataGridProps {
  readonly isLoading: boolean;
  readonly rows: GridRowsProp;
  readonly columns: GridColDef[];
  readonly onCellClickHandler?: (param: GridCellParams) => void;
}

export const DataGridComponent = (props: DataGridProps) => {
  const { isLoading, rows, columns, onCellClickHandler } = props;
  return (
    <StyledDataGrid
      autoHeight
      disableColumnFilter
      disableColumnMenu
      hideFooterSelectedRowCount
      loading={isLoading}
      rows={rows}
      columns={columns}
      onCellClick={onCellClickHandler}
      slots={{
        loadingOverlay: LoadingOverlay,
      }}
    />
  );
};

const LoadingOverlay = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" my={10}>
      <CircularProgress color="secondary" />
    </Stack>
  );
};
