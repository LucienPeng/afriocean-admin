import {
  AccordionDetails,
  AccordionSummary,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import { StyledAccordion } from '../../../Common/StyledUI/StyledAccordion';
import {
  DEFALUT_FATAYA_BOX_10_LIST,
  FATAYA,
  FatayaSpec,
  ItemCategory,
  LocalSalesOrder,
  Product,
} from '../../../../model/localSales.model';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const LocalSalesOrderFatayaAccordion = () => {
  const { getValues, setValue, watch } = useFormContext<LocalSalesOrder>();
  const [fataya, setFataya] = useState<Product>(FATAYA);
  const isFatayaAdded = watch('product').find((f) => f.id === fataya.id);

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

  const handleEditProductToChecklist = () => {
    const updatedProducts = getValues('product').map((item) => {
      if (item.id === '6046000084187') {
        return {
          ...item,
          quantity: fataya.quantity,
          price: fataya.price,
        };
      }
      return item;
    });
    setValue('product', updatedProducts);
  };

  return (
    <StyledAccordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="fataya-order" id="fataya-order-header">
        <Typography fontWeight={700} variant="h5">
          Fataya{' '}
          <Typography variant="h6" component="span">
            (10pc/boîte)
          </Typography>
        </Typography>
      </AccordionSummary>
      {DEFALUT_FATAYA_BOX_10_LIST.map((variant) => (
        <AccordionDetails
          key={variant.id}
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}
        >
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography variant="h6" color="text.primary" fontWeight={700}>
              {variant.variant}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {variant.spec}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" width="100%">
            <Stack direction="row" gap={2} alignItems="center">
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
            <Stack direction="row" alignItems="center">
              <IconButton
                color="success"
                aria-label="add-fataya"
                onClick={handleAddProductToChecklist}
                disabled={!!isFatayaAdded}
              >
                <AddCircleIcon />
              </IconButton>
              <IconButton
                color="info"
                aria-label="edit-fataya"
                onClick={handleEditProductToChecklist}
                disabled={!isFatayaAdded}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>
        </AccordionDetails>
      ))}
    </StyledAccordion>
  );
};
