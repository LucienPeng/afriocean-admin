import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { DATE_TIME_FORMAT } from '../../../model/application.model';
import { Currency, MaterialItemFormMode, MaterialModel } from '../../../model/material.model';
import { Roles } from '../../../model/company.model';
import { MaterialItemFormGeneralInfo } from './MaterialItemFormGeneralInfo';
import { MaterialItemFormIdControllers } from './MaterialItemFormIdControllers';
import { MaterialItemFormApplicantControllers } from './MaterialItemFormApplicantControllers';
import { MaterialItemFormTitleControllers } from './MaterialItemFormTitleControllers';
import { MaterialItemFormDetailControllers } from './MaterialItemFormDetailControllers';
import { MaterialItemFormPhotoController } from './MaterialItemFormPhotoController';
import { MaterialItemFormbarcodeControllers } from './MaterialItemFormbarcodeControllers';
import { MaterialItemFormActionButtons } from './MaterialItemFormActionButtons';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { useUserRedux } from '../../../useUserRedux';
import { useState } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import { useParams } from 'react-router-dom';

interface MaterialItemFormProps {
  readonly formMode?: MaterialItemFormMode;
  readonly fetcheItemDetail?: MaterialModel;
}

export const createModeValues = {
  initiateur: '',
  department: '',
  createDate: moment().format(DATE_TIME_FORMAT),
  itemId: '',
  erpId: 'neant',
  materialName: '',
  materialZhName: '',
  spec: '',
  price: 0,
  currency: Currency.CFA,
  brand: '',
  defaultQuantity: 1,
  totalQuantity: 0,
  photo: '',
};

export const MaterialItemForm = (props: MaterialItemFormProps) => {
  const { formMode, fetcheItemDetail } = props;
  const { id } = useParams();
  const { role } = useUserRedux();
  const { getFirebaseDocumentData } = useFirebaseDB();
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState(fetcheItemDetail?.photo ? fetcheItemDetail.photo : '');
  const [serialId, setSerialId] = useState<string | number>(fetcheItemDetail?.id ? fetcheItemDetail.id : 'Loading...');
  const isEditMode = formMode === MaterialItemFormMode.EDIT;
  const disabled = isEditMode ? (role === Roles.ADMIN ? false : true) : false;
  const editModeValues = fetcheItemDetail;

  const {
    isLoading,
    isFetching,
    refetch: getSerialId,
  } = useQuery({
    queryKey: ['MaterialIncrementalId'],
    queryFn: () => getFirebaseDocumentData(Collections.IncrementalIndex, 'Material'),
    onSuccess: (res) => setSerialId(res?.index + 1),
    enabled: !isEditMode,
  });

  const schema = yup.object().shape({
    itemId: yup.string().required(),
    initiateur: yup.string().required(),
    department: yup.string().required(),
    createDate: yup.string().required(),
    materialName: yup.string().required(),
    spec: yup.string().required(),
    price: yup.number().required(),
    currency: yup.string().required(),
    brand: yup.string().required(),
    defaultQuantity: yup.number().required(),
    totalQuantity: yup.number().required(),
  });

  const MaterialItemForm = useForm<MaterialModel>({
    mode: 'onSubmit',
    defaultValues: !isEditMode ? { ...createModeValues, itemId: id } : editModeValues,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...MaterialItemForm}>
      <Grid container rowSpacing={3} columnSpacing={12}>
        <MaterialItemFormGeneralInfo serialId={serialId} formMode={formMode} isLoading={isLoading || isFetching} />
        <MaterialItemFormIdControllers disabled={disabled} />
        <MaterialItemFormApplicantControllers disabled={disabled} />
        <MaterialItemFormTitleControllers disabled={disabled} />
        <MaterialItemFormDetailControllers disabled={disabled} />
        <MaterialItemFormPhotoController
          disabled={disabled}
          setPreviewURL={setPreviewURL}
          previewURL={previewURL}
          file={file}
          setFile={setFile}
        />
        <MaterialItemFormbarcodeControllers />
        <MaterialItemFormActionButtons
          isEditMode={isEditMode}
          getSerialId={getSerialId}
          previewURL={previewURL}
          file={file}
          setFile={setFile}
          serialId={serialId}
        />
      </Grid>
    </FormProvider>
  );
};
