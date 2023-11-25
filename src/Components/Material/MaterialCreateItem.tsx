import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { PageWrapper } from '../Common/PageWrapper';
import QueueIcon from '@mui/icons-material/Queue';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import moment from 'moment';
import { DATE_TIME_FORMAT } from '../../model/application.model';
import { useUserRedux } from '../../useUserRedux';
import { useNavigate } from 'react-router-dom';
import { MaterialModel } from '../../model/material.model';
import { useMaterialRedux } from '../../useMaterialRedux';
import { Collections, useFirebaseDB } from '../../useFirebaseDB';

const currency = ['CFA', 'EUR', 'TWD', 'USD'];

export const MaterialItem = () => {
  const { setFirebaseData } = useFirebaseDB();
  const { itemCount } = useMaterialRedux();
  const { profile } = useUserRedux();
  const { getValues, control } = useForm<MaterialModel>({
    mode: 'onSubmit',
    defaultValues: {
      serialIndex: String(itemCount + 1),
    },
  });

  const { serialIndex } = getValues();

  const createItem = () => {
    setFirebaseData(Collections.Material, {
      serialIndex: serialIndex,
    });
  };

  const navigate = useNavigate();
  return (
    <PageWrapper icon={<QueueIcon />} componentName=" Ajouter objets" containerMaxWidth="lg">
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              N° Index : {serialIndex}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="erpId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    onChange={onChange}
                    variant="standard"
                    margin="normal"
                    required
                    id="erpId"
                    label="N° ERP :"
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item xs={3}>
              Initiateur : {profile?.firstName}
            </Grid>
            <Grid item xs={3}>
              Department : {profile?.department}
            </Grid>
            <Grid item xs={3}>
              Date : {moment().format(DATE_TIME_FORMAT)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="materialName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="materialName"
                label="Object"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="materialZhName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="materialZhName"
                label="Objet en chinois"
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="spec"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                fullWidth
                onChange={onChange}
                variant="outlined"
                margin="normal"
                required
                id="spec"
                label="spécification"
                value={value}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <Controller
                name="brand"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="brand"
                    label="Marque"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="price"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="price"
                    label="Prix"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="currency"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="none">
                    <InputLabel id="role-label">Devise</InputLabel>
                    <Select
                      variant="outlined"
                      fullWidth
                      labelId="currency"
                      id="currency"
                      onChange={onChange}
                      value={value}
                    >
                      {currency.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                    margin="normal"
                    required
                    id="quantity"
                    label="Default Quantité"
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          Barcode
        </Grid>
        <Grid item xs={6}>
          QR code
        </Grid>

        <Grid item xs={12}>
          <Stack width="100%" direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="contained" color="error" onClick={() => navigate('/material')}>
              Anuler
            </Button>
            <Button variant="contained" onClick={createItem}>
              Ajouter
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};
