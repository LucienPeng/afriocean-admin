import { Grid } from '@mui/material';
import { LocalSalesOrderFatayaAccordion } from './LocalSalesOrderFatayaAccordion';
import { LocalSalesOrderPoudreDePoissonAccordion } from './LocalSalesOrderPoudreDePoissonAccordion';
import { Preview } from './Preview';

export const LocalSalesOrderProductsAccordionWrapper = () => {
  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={1}>
      <LocalSalesOrderFatayaAccordion />
      <LocalSalesOrderPoudreDePoissonAccordion />
      <Preview />
    </Grid>
  );
};
