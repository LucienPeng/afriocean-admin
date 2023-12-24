import { Button, Stack } from '@mui/material';
import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { StyledSearchTextField } from '../Common/StyledUI/StyledSearchTextField';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { useSearchKeywords } from '../../Utils/useSearchKeywords';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

export const LocalSalesCustomers = () => {
  const { keywords, setKeywords } = useSearchKeywords();
  const navigate = useNavigate();

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
              //onKeyDownHandler={onKeyDownHandler}
            />
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/local-sales/customers/create')}
            >
              Ajouter
            </Button>
          </Stack>

          {/* <DataGridComponent
            isLoading={isLoading || isFetching}
            rows={rows}
            columns={materialItemColumns}
            onCellClickHandler={(params: GridCellParams) => handleRedirect(params.row)}
            // noRowsOverlayHandler={handleRedirect}
            LoadingOverlay={LoadingOverlay}
            NoRowsOverlay={NoRowsOverlay}
          /> */}
        </Stack>
      </PageSection>
    </PageWrapper>
  );
};
