import { Grid } from '@mui/material';
import { LocalSalesOrderFatayaAccordion } from './LocalSalesOrderFatayaAccordion';
import { LocalSalesOrderPoudreDePoissonAccordion } from './LocalSalesOrderPoudreDePoissonAccordion';

export const LocalSalesOrderProductsAccordionWrapper = () => {
  return (
    <Grid item xs={12} display="flex" flexDirection="column" gap={1}>
      <LocalSalesOrderFatayaAccordion />
      <LocalSalesOrderPoudreDePoissonAccordion />
    </Grid>
  );
};
