import { Button, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { DATE_TIME_FORMAT } from '../../../model/application.model';
import { MaterialItemFormMode, MaterialModel } from '../../../model/material.model';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormContext } from 'react-hook-form';
import moment from 'moment';

interface MaterialItemFormGeneralInfoProps {
  readonly formMode?: MaterialItemFormMode;
  readonly serialId: string | number;
  readonly isLoading: boolean;
}

export const MaterialItemFormGeneralInfo = (props: MaterialItemFormGeneralInfoProps) => {
  const { serialId, formMode, isLoading } = props;
  const { setFirebaseData, getFirebaseDocumentData, deletFirebaseDocument } = useFirebaseDB();
  const { getValues } = useFormContext<MaterialModel>();

  const isEditMode = formMode === MaterialItemFormMode.EDIT;

  const createDate = isEditMode
    ? moment(getValues('createDate')).format(DATE_TIME_FORMAT)
    : moment().format(DATE_TIME_FORMAT);

  const navigate = useNavigate();

  const deleteMaterialItemRequest = async () => {
    return await deletFirebaseDocument(Collections.Material, String(serialId));
  };

  const { mutate: deleteMaterialitemRequest, isLoading: isDeleting } = useMutation(deleteMaterialItemRequest, {
    onSuccess: async () => {
      const newSerialId = await getFirebaseDocumentData(Collections.IncrementalIndex, 'Material');
      await setFirebaseData(Collections.IncrementalIndex, 'Material', { index: Number(newSerialId?.index) - 1 });
      navigate('/material');
    },
  });

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography
            fontWeight={700}
            color="text.primary"
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
            fontSize={24}
          >
            N° Index : {isLoading ? <CircularProgress size={20} /> : serialId}
          </Typography>
          <Typography color="text.primary" display="flex" flexDirection="row" alignItems="center" gap={2}>
            Date de création: {createDate}
          </Typography>
        </Grid>

        <Grid item xs={6} display="flex" width="100%" justifyContent="center" alignItems="center">
          <Stack width="100%" direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            {isDeleting && <CircularProgress color="secondary" size={20} />}
            {isEditMode && (
              <Button
                variant="contained"
                color="error"
                sx={{ alignSelf: 'flex-end' }}
                onClick={() => deleteMaterialitemRequest()}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};
