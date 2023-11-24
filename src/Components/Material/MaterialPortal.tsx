import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { PageWrapper } from '../Common/PageWrapper';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import InventoryIcon from '@mui/icons-material/Inventory';

export const MaterialPortal = () => {
  const navigate = useNavigate();

  return (
    // <FormProvider {...MaterialForm}>
    <PageWrapper componentName="Matériaux" icon={<InventoryIcon />} containerMaxWidth="lg">
      <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
        <StyledTextField />
        <Button variant="outlined" onClick={() => navigate('/material/create')}>
          Ajouter objets
        </Button>
      </Stack>
    </PageWrapper>
    // </FormProvider>
  );
};
