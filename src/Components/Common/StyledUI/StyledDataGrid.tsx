import { CircularProgress, styled } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)((themeOptions) => ({
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
  readonly onCellClickHandler: () => void;
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
        loadingOverlay: CircularProgress,
      }}
    />
  );
};
