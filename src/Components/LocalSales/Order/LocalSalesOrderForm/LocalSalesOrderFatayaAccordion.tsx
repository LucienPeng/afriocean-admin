import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { StyledAccordion } from '../../../Common/StyledUI/StyledAccordion';
import { FatayaSpec, ItemCategory, ItemVariant, LocalSalesOrder, Product } from '../../../../model/localSales.model';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

const fatayaSpec: string[] = Object.values(FatayaSpec);

const DEFAULT_FATAYA: Product = {
  category: ItemCategory.Fataya,
  spec: FatayaSpec.BoxFor10,
  price: 100,
  quantity: 1,
};

export const LocalSalesOrderFatayaAccordion = () => {
  const { getValues, setValue } = useFormContext<LocalSalesOrder>();
  const [fataya, setFataya] = useState<Product>(DEFAULT_FATAYA);

  const handleChange = (event: SelectChangeEvent) => {
    setFataya((prev) => {
      const updatedFataya = { ...prev, spec: event.target.value as FatayaSpec };
      return updatedFataya;
    });
  };

  useEffect(() => {
    setValue('product', [fataya]);
  }, [fataya, setValue]);

  console.log(fataya);

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography fontWeight={700} variant="h5">
          Fataya
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row" gap={2} width="100%">
          <FormControl fullWidth>
            <InputLabel id="fataya-spec">Spécification</InputLabel>
            <Select
              labelId="fataya-spec"
              id="fataya-spec"
              //value={age}
              label="Spécification"
              onChange={handleChange}
            >
              {fatayaSpec.map((spec) => (
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
