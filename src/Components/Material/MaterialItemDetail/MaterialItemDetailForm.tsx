import { PageSection } from '../../Common/PageSection';
import { MaterialItemForm } from '../MaterialItemForm';
import { MaterialItemFormMode, MaterialModel } from '../../../model/material.model';

export const MaterialItemDetailForm = (props: { fetcheItemDetail: MaterialModel | undefined }) => {
  return (
    <PageSection>
      <MaterialItemForm formMode={MaterialItemFormMode.EDIT} fetcheItemDetail={props.fetcheItemDetail} />
    </PageSection>
  );
};
