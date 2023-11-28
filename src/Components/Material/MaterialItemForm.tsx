import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import { DATE_TIME_FORMAT } from '../../model/application.model';
import { Currency, MaterialItemFormMode, MaterialModel } from '../../model/material.model';
import { Collections, useFirebaseDB } from '../../Utils/Firebase/useFirebaseDB';
import { useUserRedux } from '../../useUserRedux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useHandleActionResultAlert } from '../../Utils/useHandleActionResultAlert';
import { useState } from 'react';
import moment from 'moment';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';
import { Box } from '@mui/system';
import { useFirebaseStorage } from '../../Utils/Firebase/useFirebaseStorage';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
interface MaterialItemFormFormProps {
  readonly formMode?: MaterialItemFormMode;
  readonly fetcheItemDetail?: MaterialModel;
}

const CURRENCY_VALUE = Object.values(Currency).filter((currency) => isNaN(Number(currency)));

export const MaterialItemForm = (props: MaterialItemFormFormProps) => {
  const { formMode, fetcheItemDetail } = props;
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState(fetcheItemDetail?.photo ? fetcheItemDetail.photo : '');
  const [serialId, setSerialId] = useState<string | number>(fetcheItemDetail?.id ? fetcheItemDetail.id : 'Loading...');
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { setFirebaseData, getFirebaseDocumentData } = useFirebaseDB();
  const { uploadImage } = useFirebaseStorage();
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
    defaultQuantity: 0,
    totalQuantity: 0,
    photo: '',
  };

  const editModeValues = fetcheItemDetail;

  const { getValues, handleSubmit, reset, watch, control } = useForm<MaterialModel>({
    mode: 'onSubmit',
    defaultValues: formMode === MaterialItemFormMode.CREATE ? createModeValues : editModeValues,
  });

  const createMaterialItemRequest = async () => {
    const photoPath = await uploadImage(file, file?.name);

    await setFirebaseData(Collections.IncrementalIndex, 'Material', { index: serialId });
    await setFirebaseData(Collections.Material, String(serialId), {
      ...getValues(),
      photo: photoPath,
      id: serialId,
      date: createDate,
      totalQuantity: getValues('defaultQuantity'),
    });

    refetch();
    reset(createModeValues);
    setFile(null);
  };

  const { mutate, isLoading } = useMutation(createMaterialItemRequest, {
    onSuccess: () => setSuccessMessage('Object a été bien crée'),
    onError: () => setErrorMessage('Quelque chose ne fonntionne correctement pas '),
  });

  const navigate = useNavigate();
  const submitCreateMaterialItemRequest = async () => mutate();

  const handleFileChange = (newValue: File | null) => {
    const file = newValue;
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setPreviewURL('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewURL('');
  };

  return (
    <Grid container rowSpacing={3} columnSpacing={1}>
      <Grid item xs={12}>
        <Grid container columnSpacing={3} alignItems="center">
          <Grid item xs={2}>
            <Typography
              fontWeight={700}
              color="text.primary"
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={2}
            >
              N° Index : {isFetchingIndex ? <CircularProgress size={15} /> : serialId}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Controller
              name="itemId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <StyledTextField
                  fullWidth
                  onChange={onChange}
                  variant="standard"
                  margin="normal"
                  required
                  id="itemId"
                  label="N° Article :"
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={5}>
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
              name="defaultQuantity"
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
      <Grid item xs={12} sm={6} lg={12}>
        <Grid container justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={6}>
            <Stack alignItems="center" spacing={1}>
              <Typography color="text.primary">Photo</Typography>
              <Box maxHeight="300px" maxWidth="200px" component="img" src={previewURL} />
              <Controller
                name="photo"
                control={control}
                defaultValue={''}
                render={() => (
                  <MuiFileInput
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Sélétionner une image"
                    InputProps={{
                      inputProps: {
                        accept: 'image/*',
                      },
                      startAdornment: <AttachFileIcon />,
                      endAdornment: (
                        <IconButton onClick={handleRemoveFile}>
                          <CancelIcon />
                        </IconButton>
                      ),
                    }}
                    value={file}
                    onChange={handleFileChange}
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {watch('itemId') && (
              <Stack spacing={2} alignItems="center">
                <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                  <Typography color="text.primary">QR code</Typography>
                  <QRCode value={watch('itemId')} size={80} />
                </Stack>
                <Stack
                  width="100%"
                  direction="column"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                  sx={{ overflow: 'hidden' }}
                >
                  <Typography color="text.primary">Barcode</Typography>
                  <Barcode value={watch('itemId') ?? ''} width={1} height={30} />
                </Stack>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Stack width="100%" direction="row" justifyContent="center" alignItems="center" spacing={2}>
          {isLoading ? (
            <CircularProgress color="secondary" size={20} />
          ) : successMessage.length !== 0 ? (
            <ActionSuccessAlert />
          ) : errorMessage.length !== 0 ? (
            <ErrorMessageAlert />
          ) : null}
          {formMode === MaterialItemFormMode.CREATE ? (
            <Stack direction="row" spacing={1} py={1}>
              <Button variant="contained" color="error" onClick={() => navigate('/material')}>
                Anuler
              </Button>
              <Button variant="contained" onClick={handleSubmit(submitCreateMaterialItemRequest)}>
                Ajouter
              </Button>
            </Stack>
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
