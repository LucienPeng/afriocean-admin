import { LocalSalesOrder, Product } from '../../../../../model/localSales.model';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const getTotalAmount = (arr: Product[]): number =>
  arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

export const useHandleOrderOperation = (defaultProduct: Product) => {
  const { getValues, setValue, watch } = useFormContext<LocalSalesOrder>();
  const [item, setItem] = useState<Product>(defaultProduct);
  const isItemAdded = watch('product').find((f) => f.id === item.id);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => {
      const updateditem = { ...prev, quantity: parseInt(event.target.value) };
      return updateditem;
    });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => {
      const updatedFataya = { ...prev, price: parseInt(event.target.value) };
      return updatedFataya;
    });
  };

  const handleAddProductToChecklist = () => {
    setValue('product', [...getValues('product'), item], { shouldDirty: true });
  };

  const handleEditProductToChecklist = () => {
    const updatedProducts = getValues('product').map((i) => {
      if (i.id === item.id) {
        return {
          ...i,
          quantity: item.quantity,
          price: item.price,
        };
      }
      return i;
    });
    setValue('product', updatedProducts, { shouldDirty: true });
  };

  return {
    handleQuantityChange,
    handlePriceChange,
    handleAddProductToChecklist,
    handleEditProductToChecklist,
    isItemAdded,
    item,
  };
};
