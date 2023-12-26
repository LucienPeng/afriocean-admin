import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { StyledAccordion } from '../../../Common/StyledUI/StyledAccordion';
import { FatayaSpec, ItemCategory, LocalSalesOrder, Product } from '../../../../model/localSales.model';
import { useFormContext } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

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

  const handleSpecChange = (event: SelectChangeEvent) => {
    setFataya((prev) => {
      const updatedFataya = { ...prev, spec: event.target.value as FatayaSpec };
      return updatedFataya;
    });
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFataya((prev) => {
      const updatedFataya = { ...prev, quantity: parseInt(event.target.value) };
      return updatedFataya;
    });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFataya((prev) => {
      const updatedFataya = { ...prev, price: parseInt(event.target.value) };
      return updatedFataya;
    });
  };

  const handleAddProductToChecklist = () => {
    setValue('product', [...getValues('product'), fataya]);
  };

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
              value={fataya.spec}
              label="Spécification"
              onChange={handleSpecChange}
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
            onChange={handleQuantityChange}
            value={fataya.quantity}
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <StyledTextField
            fullWidth
            variant="standard"
            margin="normal"
            required
            id="price"
            label="Prix"
            onChange={handlePriceChange}
            value={fataya.price}
            type="number"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">{'CFA'}</InputAdornment>,
            }}
          />
        </Stack>

        <IconButton sx={{ ml: 3 }} color="success" aria-label="add-fataya" onClick={handleAddProductToChecklist}>
          <AddCircleIcon />
        </IconButton>
      </AccordionDetails>
    </StyledAccordion>
  );
};
