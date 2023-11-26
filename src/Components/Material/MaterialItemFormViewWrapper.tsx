import { MaterialItemFormMode } from '../../model/material.model';
import { PageSection } from '../Common/PageSection';
import { PageWrapper } from '../Common/PageWrapper';
import { MaterialItemForm } from './MaterialItemForm';
import InventoryIcon from '@mui/icons-material/Inventory';

export const MaterialItemFormViewWrapper = () => {
  return (
    <PageWrapper icon={<InventoryIcon />} componentName=" Ajouter objets" containerMaxWidth="lg">
      <PageSection>
        <MaterialItemForm formMode={MaterialItemFormMode.CREATE} />
      </PageSection>
    </PageWrapper>
  );
};
