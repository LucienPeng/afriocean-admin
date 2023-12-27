import { useNavigate } from 'react-router-dom';
import { PageSection } from '../../../Common/PageSection';
import { DataGridComponent } from '../../../Common/StyledUI/StyledDataGrid';
import { LoadingOverlay, NoRowsOverlay } from '../../../Common/StyledUI/TableOverlayComponents';
import { useLocalCustomerOrderTable } from './useLocalCustomerOrderTable';
import { GridCellParams } from '@mui/x-data-grid';

export const LocalSalesCustomerOrderRecord = (props: { customerId: string | undefined }) => {
  const { rows, columns, isLoading } = useLocalCustomerOrderTable(props.customerId);
  const navigate = useNavigate();
  const handleRedirect = (id: string) => navigate(`/local-sales/orders/edit/${id}`);

  return (
    <PageSection>
      <DataGridComponent
        isLoading={isLoading}
        rows={rows ?? []}
        columns={columns}
        onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row.orderId)}
        LoadingOverlay={LoadingOverlay}
        NoRowsOverlay={NoRowsOverlay}
      />
    </PageSection>
  );
};
