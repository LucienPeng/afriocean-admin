import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../Common/PageWrapper';
import InventoryIcon from '@mui/icons-material/Inventory';

export const MaterialPortal = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper componentName="Matériaux" icon={<InventoryIcon />} containerMaxWidth="lg">
      <Button variant="outlined" onClick={() => navigate('/material/create')}>
        Ajouter objets
      </Button>
    </PageWrapper>
  );
};
