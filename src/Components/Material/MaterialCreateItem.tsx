import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { PageWrapper } from '../Common/PageWrapper';
import QueueIcon from '@mui/icons-material/Queue';

interface Material {
  readonly serialIndex: string;
  readonly erpId: string;
  readonly department: string;
  readonly title: string;
  readonly zHTitle: string;
  readonly spec: string;
  readonly price: string;
  readonly currency: string;
  readonly supplier: string;
  readonly quantity: number;
  readonly photo: string;
  readonly barCode: string;
}

export const MaterialItem = () => {
  const { control, watch, reset, getValues, handleSubmit } = useForm<Material>({
    mode: 'onSubmit',
    //defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
    <PageWrapper icon={<QueueIcon />} componentName=" Ajouter objets" containerMaxWidth="lg">
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid item xs={12}>
          123
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
