import { Box, CircularProgress, Stack, Tab, Tabs } from '@mui/material';
import { PageSection } from '../../Common/PageSection';
import { PageWrapper } from '../../Common/PageWrapper';
import { StyledSearchTextField } from '../../Common/StyledUI/StyledSearchTextField';
import { useEffect, useState } from 'react';
import { useSearchKeywords } from '../../../Utils/useSearchKeywords';
import { LocalSalesOrder, OrderStatus } from '../../../model/localSales.model';
import { useNavigate } from 'react-router-dom';
import { DataGridComponent } from '../../Common/StyledUI/StyledDataGrid';
import { GridCellParams } from '@mui/x-data-grid';
import { LoadingOverlay, NoRowsOverlay } from '../../Common/StyledUI/TableOverlayComponents';
import { useLocalSalesorderTable } from './useLocalSalesOrderTable';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { LocalSalesOrderMobileCard } from './LocalSalesOrderMobileCard';
import { useDeviceMetadata } from '../../Common/DeviceMetadataProvider';

function a11yProps(index: number) {
  return {
    id: `order-tab-${index}`,
    'aria-controls': `order-${index}`,
  };
}

export const LocalSalesOrders = () => {
  const { throttledValue, keywords, setKeywords } = useSearchKeywords();
  const { rows, columns, isFetching, isLoading, isSuccess } = useLocalSalesorderTable();
  const { isMobileView } = useDeviceMetadata();
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredRows, setFilteredRows] = useState<LocalSalesOrder[]>([]);
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const handleRedirect = (id: string) => navigate(`/local-sales/orders/edit/${id}`);
  const isProcessing = isLoading || isFetching || isFiltering;

  useEffect(() => {
    if (rows) {
      let filteredData;
      switch (value) {
        case 0:
          setFilteredRows(rows);
          break;
        case 1:
          filteredData = rows?.filter((row) => {
            return !row.status?.delivered && !row.status?.paid;
          });
          setFilteredRows(filteredData);
          break;
        case 2:
          filteredData = rows?.filter((row) => {
            return row.status?.delivered && !row.status?.paid;
          });
          setFilteredRows(filteredData);
          break;
        case 3:
          filteredData = rows?.filter((row) => {
            return row.status?.delivered && row.status?.paid;
          });
          setFilteredRows(filteredData);
          break;
        default:
          setFilteredRows(rows);
      }
    }
  }, [rows, value]);

  useEffect(() => {
    if (throttledValue !== '' && rows) {
      setIsFiltering(true);
      const filteredData = rows.filter((row) => {
        return (
          row.orderId?.toLowerCase().includes(throttledValue.toLowerCase()) ||
          row.customer?.firstName?.toLowerCase().includes(throttledValue.toLowerCase()) ||
          row.customer?.lastName?.toLowerCase().includes(throttledValue.toLowerCase())
        );
      });
      setFilteredRows(filteredData);
      setIsFiltering(false);
    } else if (throttledValue === '' && rows) {
      setFilteredRows(rows);
    }
  }, [rows, throttledValue]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isSuccess && rows) setFilteredRows(rows);
  }, [isSuccess, rows]);

  return (
    <PageWrapper icon={<PointOfSaleIcon />} componentName="Orders" containerMaxWidth="lg">
      <PageSection>
        <Stack width="100%" direction="column" spacing={5}>
          <Stack alignItems="center" direction="row" spacing={2}>
            <StyledSearchTextField
              id="material-search-bar"
              keywords={keywords}
              setKeywords={setKeywords}
              placeholder="Veuillez saisir le numéro de la commande ou le nom du client."
            />
          </Stack>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              value={value}
              onChange={handleTabChange}
              aria-label="order table switcher"
            >
              <Tab label="Tous" {...a11yProps(0)} disabled={isProcessing} />
              <Tab label={OrderStatus.Start} disabled={isProcessing} {...a11yProps(1)} />
              <Tab label={OrderStatus.UnPaid} disabled={isProcessing} {...a11yProps(2)} />
              <Tab label={OrderStatus.Terminé} disabled={isProcessing} {...a11yProps(3)} />
            </Tabs>
          </Box>
          {!isMobileView && (
            <DataGridComponent
              isLoading={isProcessing}
              rows={!filteredRows || isProcessing ? [] : filteredRows}
              columns={columns}
              onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row.orderId)}
              LoadingOverlay={LoadingOverlay}
              NoRowsOverlay={NoRowsOverlay}
            />
          )}
        </Stack>
      </PageSection>
      {isMobileView ? (
        isProcessing ? (
          <Stack justifyContent="center" alignItems="center" my={5}>
            <CircularProgress size={30} />
          </Stack>
        ) : (
          <LocalSalesOrderMobileCard orders={filteredRows} />
        )
      ) : null}
    </PageWrapper>
  );
};
