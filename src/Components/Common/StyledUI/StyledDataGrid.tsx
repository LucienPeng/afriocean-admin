import { CircularProgress, styled } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

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
      onCellClick={onCellClickHandler}
    />
  );
};
