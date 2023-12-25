import { useEffect, useState } from 'react';
import { useSearchKeywords } from '../../../Utils/useSearchKeywords';
import { useNavigate } from 'react-router-dom';
import { useLocalSalesCustomerTable } from './useLocalSalesCustomerTable';
import { Button, Stack } from '@mui/material';
import { PageSection } from '../../Common/PageSection';
import { PageWrapper } from '../../Common/PageWrapper';
import { StyledSearchTextField } from '../../Common/StyledUI/StyledSearchTextField';
import { DataGridComponent } from '../../Common/StyledUI/StyledDataGrid';
import { GridCellParams } from '@mui/x-data-grid';
import { LoadingOverlay, NoRowsOverlay } from '../../Common/StyledUI/TableOverlayComponents';
import { LocalSalesCustomer } from '../../../model/localSales.model';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

export const LocalSalesCustomers = () => {
  const { throttledValue, keywords, setKeywords } = useSearchKeywords();
  const { rows, columns, isFetching, isLoading, isSuccess } = useLocalSalesCustomerTable();
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredRows, setFilteredRows] = useState<LocalSalesCustomer[]>([]);
  const navigate = useNavigate();
  const handleRedirect = (id: string) => navigate(`/local-sales/customers/edit/${id}`);
  const isProcessing = isLoading || isFetching || isFiltering;

  useEffect(() => {
    if (throttledValue !== '' && rows) {
      setIsFiltering(true);
      const filteredData = rows.filter((row) => {
        return (
          row.phone1.toLowerCase().includes(throttledValue.toLowerCase()) ||
          row.phone2?.toLowerCase().includes(throttledValue.toLowerCase()) ||
          row.id.toLowerCase().includes(throttledValue.toLowerCase())
        );
      });
      setFilteredRows(filteredData);
      setIsFiltering(false);
    } else if (throttledValue === '' && rows) {
      setFilteredRows(rows);
    }
  }, [rows, throttledValue]);

  useEffect(() => {
    if (isSuccess && rows) setFilteredRows(rows);
  }, [isSuccess, rows]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Customers" containerMaxWidth="lg">
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
              onClick={() => navigate('/local-sales/customers/create')}
            >
              Ajouter
            </Button>
          </Stack>
          <DataGridComponent
            isLoading={isProcessing}
            rows={!filteredRows || isProcessing ? [] : filteredRows}
            columns={columns}
            onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row.uuid)}
            LoadingOverlay={LoadingOverlay}
            NoRowsOverlay={NoRowsOverlay}
          />
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
