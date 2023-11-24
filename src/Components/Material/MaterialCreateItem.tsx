import { Grid } from '@mui/material';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { PageWrapper } from '../Common/PageWrapper';
import QueueIcon from '@mui/icons-material/Queue';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';

export interface Material {
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
  const { control } = useForm<Material>({
    mode: 'onSubmit',
    //defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
    <PageWrapper icon={<QueueIcon />} componentName=" Ajouter objets" containerMaxWidth="lg">
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              N° Index :
            </Grid>
            <Grid item xs={12} sm={3}>
              N° ERP :
            </Grid>
            <Grid item xs={12} sm={3}>
              Initiater :
            </Grid>
            <Grid item xs={12} sm={3}>
              Date :
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Controller
            name="serialIndex"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                // id="destination"
                // label="destination"
                value={value}
              />
            )}
          /> */}
        </Grid>
        <Grid item xs={12}>
          123
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
