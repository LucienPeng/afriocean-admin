import { Button, Stack } from '@mui/material';
import { PageSection } from '../../Common/PageSection';
import { PageWrapper } from '../../Common/PageWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { StyledSearchTextField } from '../../Common/StyledUI/StyledSearchTextField';
import { useState } from 'react';
import { useSearchKeywords } from '../../../Utils/useSearchKeywords';
import { useLocalSalesCustomerTable } from '../Customer/useLocalSalesCustomerTable';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const LocalSalesOrder = () => {
  const { throttledValue, keywords, setKeywords } = useSearchKeywords();
  const { rows, columns, isFetching, isLoading, isSuccess } = useLocalSalesCustomerTable();
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredRows, setFilteredRows] = useState<LocalSalesCustomer[]>([]);

  const navigate = useNavigate();
  const handleRedirect = (id: string) => navigate(`/local-sales/customers/edit/${id}`);
  const isProcessing = isLoading || isFetching || isFiltering;

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Orders" containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" direction="column" spacing={5}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledSearchTextField
              id="material-search-bar"
              keywords={keywords}
              setKeywords={setKeywords}
              placeholder="Veuillez saisir le numéro de téléphone ou l'identité du client."
            />
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/local-sales/orders/create')}
            >
              Ajouter
            </Button>
          </Stack>
          {/* <DataGridComponent
            isLoading={isProcessing}
            rows={!filteredRows || isProcessing ? [] : filteredRows}
            columns={columns}
            onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row.uuid)}
            LoadingOverlay={LoadingOverlay}
            NoRowsOverlay={NoRowsOverlay}
          /> */}
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
