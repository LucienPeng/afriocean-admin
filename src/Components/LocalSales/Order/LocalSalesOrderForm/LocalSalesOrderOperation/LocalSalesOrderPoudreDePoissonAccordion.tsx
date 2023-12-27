import { AccordionSummary, Typography } from '@mui/material';
import { StyledAccordion } from '../../../../Common/StyledUI/StyledAccordion';
import { DEFALUT_POUDRE_POISSON_BAG_100_LIST } from '../../../../../model/localSales.model';
import { LocalSalesOrderPoudreDePoissonFields } from './LocalSalesOrderPoudreDePoissonFields';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const LocalSalesOrderPoudreDePoissonAccordion = () => {
  return (
    <StyledAccordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="pouder-poisson-order"
        id="pouder-poisson-order-header"
      >
        <Typography fontWeight={700} variant="h5">
          Poudre de poisson{' '}
          <Typography variant="h6" component="span">
            (100g/paquet)
          </Typography>
        </Typography>
      </AccordionSummary>
      {DEFALUT_POUDRE_POISSON_BAG_100_LIST.map((variant) => (
        <LocalSalesOrderPoudreDePoissonFields key={variant.id} variant={variant} />
      ))}
    </StyledAccordion>
  );
};
