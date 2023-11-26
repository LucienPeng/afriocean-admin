import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import { DATE_TIME_FORMAT } from '../../model/application.model';
import { Currency, MaterialItemFormMode, MaterialModel } from '../../model/material.model';
import { Collections, useFirebaseDB } from '../../useFirebaseDB';
import { useUserRedux } from '../../useUserRedux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useHandleActionResultAlert } from '../../Utils/useHandleActionResultAlert';
import moment from 'moment';
import { useState } from 'react';

interface MaterialItemFormFormProps {
  readonly formMode?: MaterialItemFormMode;
  readonly fetcheItemDetail?: MaterialModel;
}

const CURRENCY_VALUE = Object.values(Currency).filter((currency) => isNaN(Number(currency)));

export const MaterialItemForm = (props: MaterialItemFormFormProps) => {
  const { formMode, fetcheItemDetail } = props;
  const [serialId, setSerialId] = useState<string | number>(fetcheItemDetail?.id ? fetcheItemDetail.id : 'Loading...');
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { setFirebaseData, getFirebaseDocumentData } = useFirebaseDB();
  const { profile } = useUserRedux();

  const { isLoading: isFetchingIndex, refetch } = useQuery({
    queryKey: ['MaterialIncrementalId'],
    queryFn: () => getFirebaseDocumentData(Collections.IncrementalIndex, 'Material'),
    onSuccess: (res) => setSerialId(res?.index + 1),
    enabled: formMode === MaterialItemFormMode.CREATE,
  });

  const firstName = profile?.firstName;
  const department = profile?.department;
  const createDate = moment().format(DATE_TIME_FORMAT);

  const createModeValues = {
    firstName,
    department,
    createDate,
    erpId: '',
    materialName: '',
    materialZhName: '',
    spec: '',
    price: '',
    currency: Currency.CFA,
    brand: '',
    quantity: 0,
    photo: '',
  };

  const editModeValues = fetcheItemDetail;

  const { getValues, handleSubmit, reset, control } = useForm<MaterialModel>({
    mode: 'onSubmit',
    defaultValues: formMode === MaterialItemFormMode.CREATE ? createModeValues : editModeValues,
  });

  const createMaterialItemRequest = async () => {
    await setFirebaseData(Collections.IncrementalIndex, 'Material', { index: serialId });
    await setFirebaseData(Collections.Material, String(serialId), {
      ...getValues(),
      id: serialId,
      date: createDate,
    });
    refetch();
    reset(createModeValues);
  };

  const { mutate, isLoading } = useMutation(createMaterialItemRequest, {
    onSuccess: () => setSuccessMessage('Object a été bien crée'),
    onError: () => setErrorMessage('Quelque chose ne fonntionne correctement pas '),
  });

  const navigate = useNavigate();
  const submitCreateMaterialItemRequest = async () => mutate();

  return (
    <Grid container rowSpacing={3} columnSpacing={1}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            N° Index : {isFetchingIndex ? 'Loading...' : serialId}
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
            Initiateur : {firstName}
          </Grid>
          <Grid item xs={3}>
            Department : {department}
          </Grid>
          <Grid item xs={3}>
            Date de création: {createDate}
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
              label="Titre"
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
              label="Titre en chinois"
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
              label="Spécification"
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
                    {CURRENCY_VALUE.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
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
        <Stack width="100%" direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : successMessage.length !== 0 ? (
            <ActionSuccessAlert />
          ) : errorMessage.length !== 0 ? (
            <ErrorMessageAlert />
          ) : null}
          {formMode === MaterialItemFormMode.CREATE ? (
            <>
              <Button variant="contained" color="error" onClick={() => navigate('/material')}>
                Anuler
              </Button>
              <Button variant="contained" onClick={handleSubmit(submitCreateMaterialItemRequest)}>
                Ajouter
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="error" onClick={() => navigate('/material')}>
                Anuler
              </Button>
              <Button variant="contained" onClick={handleSubmit(submitCreateMaterialItemRequest)}>
                Save
              </Button>
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};
