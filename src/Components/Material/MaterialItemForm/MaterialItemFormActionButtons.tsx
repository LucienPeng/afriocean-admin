import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Calculation, MaterialModel, Operation, Warehouse } from '../../../model/material.model';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { useUserRedux } from '../../../useUserRedux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useHandleActionResultAlert } from '../../../Utils/useHandleActionResultAlert';
import { useFirebaseStorage } from '../../../Utils/Firebase/useFirebaseStorage';
import { Roles } from '../../../model/company.model';
import { createModeValues } from '.';

interface MMaterialItemFormActionButtonsProps {
  readonly file: File | null;
  readonly serialId: string | number;
  readonly previewURL: string;
  readonly isEditMode: boolean;
  readonly getSerialId: () => void;
  readonly setFile: (file: File | null) => void;
}

export const MaterialItemFormActionButtons = (props: MMaterialItemFormActionButtonsProps) => {
  const { file, serialId, previewURL, isEditMode, getSerialId, setFile } = props;
  const { errorMessage, successMessage, setErrorMessage, setSuccessMessage, ErrorMessageAlert, ActionSuccessAlert } =
    useHandleActionResultAlert();
  const { setFirebaseData } = useFirebaseDB();
  const { uploadImage } = useFirebaseStorage();
  const { role } = useUserRedux();
  const { formState, getValues, handleSubmit, reset } = useFormContext<MaterialModel>();

  const navigate = useNavigate();

  const createMaterialItemRequest = async () => {
    const photoPath = await uploadImage(file, file?.name);
    const isSnWarehouse = getValues('defaultWarehouse') === Warehouse.SN;
    await setFirebaseData(Collections.IncrementalIndex, 'Material', { index: serialId });
    await setFirebaseData(Collections.Material, String(serialId), {
      ...getValues(),
      photo: photoPath,
      id: serialId,
      totalQuantity: getValues('defaultQuantity'),
      totalTwQuantity: isSnWarehouse ? 0 : getValues('defaultQuantity'),
      totalSnQuantity: isSnWarehouse ? getValues('defaultQuantity') : 0,
      record: [
        {
          initiateur: getValues('initiateur'),
          note: '',
          calculation: Calculation.IN,
          operation: Operation.CREATE,
          operationDate: getValues('createDate'),
          quantityToBeProcessed: getValues('defaultQuantity'),
          subtotalQuantity: getValues('defaultQuantity'),
        },
      ],
    });

    getSerialId();
    reset(createModeValues);
    setFile(null);
  };

  const editMaterialItemRequest = async () => {
    if (role === Roles.ADMIN) {
      const photoPath = await uploadImage(file, file?.name);

      await setFirebaseData(Collections.Material, String(serialId), {
        ...getValues(),
        photo: previewURL !== getValues('photo') ? photoPath : getValues('photo'),
      });

      setFile(null);
    }
  };

  const { mutate: submitCreateMaterialItemRequest, isLoading } = useMutation(
    !isEditMode ? createMaterialItemRequest : editMaterialItemRequest,
    {
      onSuccess: () => setSuccessMessage(isEditMode ? 'Object a été bien mis à jour' : 'Object a été bien crée'),
      onError: () => setErrorMessage('Quelque chose ne fonntionne pas'),
    },
  );

  const handleCancel = () => {
    if (!isEditMode) navigate('/material');
    reset(createModeValues);
  };

  return (
    <Grid item xs={12}>
      <Stack width="100%" direction="row" justifyContent="center" alignItems="center" spacing={2}>
        {isLoading ? (
          <CircularProgress color="secondary" size={20} />
        ) : successMessage.length !== 0 ? (
          <ActionSuccessAlert />
        ) : errorMessage.length !== 0 ? (
          <ErrorMessageAlert />
        ) : null}

        <Typography></Typography>
        <Stack direction="row" spacing={1} py={1}>
          <Button variant="contained" color="error" onClick={handleCancel}>
            Anuler
          </Button>
          <Button
            disabled={!!Object.keys(formState.errors)[0]}
            variant="contained"
            onClick={handleSubmit(() => submitCreateMaterialItemRequest())}
          >
            {!isEditMode ? 'Créer' : 'Save'}
          </Button>
        </Stack>
      </Stack>
    </Grid>
  );
};
