import { AccordionDetails, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { StyledTextField } from '../../../Common/StyledUI/StyledTextField';
import { LocalSalesOrder, Product } from '../../../../model/localSales.model';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormContext } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

export const LocalSalesOrderPoudreDePoissonFields = (props: { variant: Product }) => {
  const { variant } = props;
  const { getValues, setValue, watch } = useFormContext<LocalSalesOrder>();
  const [pouderPoisson, setPouderPoisson] = useState<Product>(variant);
  const isItemAdded = watch('product').find((f) => f.id === pouderPoisson.id);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPouderPoisson((prev) => {
      const updatedFataya = { ...prev, quantity: parseInt(event.target.value) };
      return updatedFataya;
    });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPouderPoisson((prev) => {
      const updatedFataya = { ...prev, price: parseInt(event.target.value) };
      return updatedFataya;
    });
  };

  const handleAddProductToChecklist = () => {
    setValue('product', [...getValues('product'), pouderPoisson]);
  };

  const handleEditProductToChecklist = () => {
    const updatedProducts = getValues('product').map((item) => {
      if (item.id === variant.id) {
        return {
          ...item,
          quantity: pouderPoisson.quantity,
          price: pouderPoisson.price,
        };
      }
      return item;
    });
    setValue('product', updatedProducts);
  };

  return (
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
            value={pouderPoisson.quantity}
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
            value={pouderPoisson.price}
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
            disabled={!!isItemAdded}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
            color="info"
            aria-label="edit-fataya"
            onClick={handleEditProductToChecklist}
            disabled={!isItemAdded}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      </Stack>
    </AccordionDetails>
  );
};
