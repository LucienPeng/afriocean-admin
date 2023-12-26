import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputLabel, MenuItem, Select, Stack, styled } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { StyledAccordion } from '../../../Common/StyledUI/StyledAccordion';
import { ItemVariant, PoudreDePoissonSpec } from '../../../../model/localSales.model';

const poudreDePoissonSpec: string[] = Object.values(PoudreDePoissonSpec);
const poudreDePoissonVariant: string[] = Object.values(ItemVariant);

export const LocalSalesOrderPoudreDePoissonAccordion = () => {
  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography fontWeight={700} variant="h5">
          Poudre de poisson
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" gap={2} width="100%">
          <FormControl fullWidth>
            <InputLabel id="fataya-spec">Espèce</InputLabel>
            <Select
              labelId="fataya-spec"
              id="fataya-spec"
              //value={age}
              label="Spécification"
              // onChange={handleChange}
            >
              {poudreDePoissonVariant.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="fataya-spec">Spécification</InputLabel>
            <Select
              labelId="fataya-spec"
              id="fataya-spec"
              //value={age}
              label="Spécification"
              // onChange={handleChange}
            >
              {poudreDePoissonSpec.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <StyledTextField
            fullWidth
            variant="standard"
            margin="normal"
            required
            id="quantity"
            label="Quantité"
            //value={value}
          />
          <StyledTextField
            fullWidth
            variant="standard"
            margin="normal"
            required
            id="price"
            label="Prix"
            //value={value}
          />
        </Stack>
        <Stack direction="row" ml={5}>
          <IconButton aria-label="">
            <AddCircleIcon />
          </IconButton>
          <IconButton aria-label="">
            <RemoveCircleIcon />
          </IconButton>
        </Stack>
      </AccordionDetails>
    </StyledAccordion>
  );
};
