import { PageWrapper } from '../Common/PageWrapper';
import { PageSection } from '../Common/PageSection';
import { MaterialItemForm } from './MaterialItemForm';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { useQuery } from 'react-query';
import { Collections, useFirebaseDB } from '../../Utils/Firebase/useFirebaseDB';
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import {
  Calculation,
  MaterialItemFormMode,
  MaterialModel,
  MaterialQuantityFlow,
  Operation,
} from '../../model/material.model';
import { GridColDef } from '@mui/x-data-grid';
import { Controller, useForm } from 'react-hook-form';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import InventoryIcon from '@mui/icons-material/Inventory';
import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../model/application.model';
import { ChangeEvent, useCallback, useState } from 'react';
import { useUserRedux } from '../../useUserRedux';
import { useParams } from 'react-router';

const OPERATION_VALUE = Object.values(Operation).filter((operation) => isNaN(Number(operation)));
const CALCULATION_VALUE = Object.values(Calculation).filter((operation) => isNaN(Number(operation)));

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'initiateur', headerName: 'Initiateur', flex: 1 },
  { field: 'operation', headerName: 'Opération', flex: 1 },
  { field: 'calculation', headerName: 'Calcul', flex: 1 },
  { field: 'quantityToBeProcessed', headerName: 'Quantité', flex: 1 },
  { field: 'subtotalQuantity', headerName: 'Sous-total', flex: 1 },
];

const mapRows = (data: MaterialModel) => {
  return data.record?.map((s, index) => {
    return {
      id: index,
      initiateur: s.initiateur,
      date: moment(s.operationDate, DATE_TIME_FORMAT).startOf('day').format(DATE_FORMAT),
      calculation: s.calculation,
      operation: s.operation,
      quantityToBeProcessed: s.quantityToBeProcessed,
      subtotalQuantity: s.subtotalQuantity,
    };
  });
};

const DEFAULT_VALUES = {
  operation: Operation.INANDOUT,
  calculation: Calculation.OUT,
  quantityToBeProcessed: '',
};

const useMaterialItemDetail = (id: string | undefined) => {
  const { getFirebaseDocumentData } = useFirebaseDB();

  const { refetch, data, isLoading, isFetching } = useQuery<MaterialModel>({
    queryKey: ['materialItemDetail', id],
    queryFn: () => getFirebaseDocumentData('Material', id ?? '') as Promise<MaterialModel>,
    enabled: !!id,
  });

  return { refetch, data, isLoading, isFetching };
};

export const MaterialItemDetail = () => {
  const [num, setNum] = useState<number | string>('');
  const { id } = useParams();
  const { setFirebaseData } = useFirebaseDB();
  const { profile } = useUserRedux();
  const { refetch, data: fetcheItemDetail, isLoading, isFetching } = useMaterialItemDetail(id);
  const { control, watch, reset, getValues, handleSubmit, setValue } = useForm<MaterialQuantityFlow>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const { calculation, operation } = getValues();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      const value = parseInt(e.target.value);
      const yy = isNaN(value) ? '' : parseInt(e.target.value);
      setNum(yy);
      setValue('quantityToBeProcessed', yy);
    }
  };

  const totalQuantity: number = Number(fetcheItemDetail?.totalQuantity) || 0;
  const componentTitle: string = fetcheItemDetail ? `${fetcheItemDetail?.id} / ${fetcheItemDetail?.materialName}` : '';

  const updateItemQuantity = useCallback(async () => {
    if (!fetcheItemDetail) return;
    const newData = { ...fetcheItemDetail };

    let updatedTotalQuantity = 0;

    if (calculation === Calculation.IN) {
      updatedTotalQuantity = totalQuantity + (num as number);
    } else if (calculation === Calculation.OUT) {
      updatedTotalQuantity = totalQuantity - (num as number);
    }

    newData.totalQuantity = updatedTotalQuantity;

    newData.record = [
      ...(newData.record || []),
      {
        initiateur: profile?.firstName ?? '',
        operationDate: moment().format(DATE_TIME_FORMAT),
        operation,
        calculation,
        quantityToBeProcessed: num,
        subtotalQuantity: updatedTotalQuantity,
      },
    ];

    await setFirebaseData(Collections.Material, String(newData.id), newData);
    await refetch();
    setNum(0);
    reset(DEFAULT_VALUES);
  }, [
    calculation,
    fetcheItemDetail,
    num,
    operation,
    profile?.firstName,
    refetch,
    reset,
    setFirebaseData,
    totalQuantity,
  ]);

  return (
    <PageWrapper icon={<InventoryIcon />} componentName={componentTitle} containerMaxWidth="lg">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!isLoading && (
        <>
          <PageSection>
            <MaterialItemForm
              formMode={MaterialItemFormMode.EDIT}
              fetcheItemDetail={fetcheItemDetail as MaterialModel}
            />
          </PageSection>

          <PageSection>
            <Stack width="100%" direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                <Grid item xs={7}>
                  <Stack
                    width="100%"
                    direction="column"
                    justifyContent="space-between"
                    justifyItems="center"
                    spacing={3}
                  >
                    <Stack spacing={2} direction="row" width="100%" justifyContent="space-between">
                      <StyledPaper sx={{ width: '100%' }}>
                        <Stack direction="column" alignItems="center" p={1} textAlign="center">
                          <Typography fontSize="25px" fontWeight={700} color="text.primary">
                            Quantité présente
                          </Typography>
                          <Typography fontSize="40px" fontWeight={700} color="text.primary">
                            {totalQuantity}
                          </Typography>
                        </Stack>
                      </StyledPaper>
                      <StyledPaper sx={{ width: '100%' }}>
                        <Stack direction="column" alignItems="center" p={1} textAlign="center">
                          <Typography
                            fontSize="25px"
                            fontWeight={700}
                            color={watch('calculation') === Calculation.IN ? 'blue' : 'red'}
                          >
                            {watch('calculation') === Calculation.IN ? 'Augmentation' : 'Déduction'}
                          </Typography>
                          <Typography
                            fontSize="40px"
                            fontWeight={700}
                            color={watch('calculation') === Calculation.IN ? 'blue' : 'red'}
                          >
                            {watch('calculation') === Calculation.IN ? '+' + ' ' + num : '-' + ' ' + num}
                          </Typography>
                        </Stack>
                      </StyledPaper>
                    </Stack>

                    <StyledPaper>
                      <Stack direction="column" alignItems="center" p={1} textAlign="center">
                        <Typography fontSize="25px" fontWeight={700} color="text.primary">
                          Stock Total :
                        </Typography>
                        <Typography fontSize="40px" fontWeight={700} color="text.primary">
                          ={' '}
                          {watch('calculation') === Calculation.IN
                            ? totalQuantity + (num as number)
                            : totalQuantity - (num as number)}
                        </Typography>
                      </Stack>
                      <Typography fontSize="25px" fontWeight={700} color="text.primary"></Typography>
                    </StyledPaper>
                  </Stack>
                </Grid>
                <Grid item xs={5}>
                  <Stack direction="column" gap={3}>
                    <Controller
                      name="operation"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <FormControl fullWidth margin="none">
                          <InputLabel id="operation-label">Operation</InputLabel>
                          <Select
                            variant="outlined"
                            fullWidth
                            labelId="operation"
                            id="operation"
                            value={value}
                            onChange={onChange}
                          >
                            {OPERATION_VALUE.map((operation) => (
                              <MenuItem key={operation} value={operation}>
                                {operation}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Controller
                      name="calculation"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <FormControl fullWidth margin="none">
                          <InputLabel id="calculation-label">Entreé/Sortie</InputLabel>
                          <Select
                            variant="outlined"
                            fullWidth
                            labelId="calculation"
                            id="calculation"
                            value={value}
                            onChange={onChange}
                          >
                            {CALCULATION_VALUE.map((calculation) => (
                              <MenuItem key={calculation} value={calculation}>
                                {calculation}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                    <Controller
                      name="quantityToBeProcessed"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value } }) => (
                        <StyledTextField
                          value={value}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          variant="outlined"
                          margin="normal"
                          required
                          id="quantityToBeProcessed"
                          label="Quantité"
                        />
                      )}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Stack direction="row" width="100%" spacing={2} justifyContent="center">
                {isFetching && <CircularProgress color="secondary" />}
                <Button variant="contained" color="error">
                  Anuler
                </Button>
                <Button variant="contained" onClick={handleSubmit(updateItemQuantity)}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </PageSection>

          <PageSection>
            {fetcheItemDetail && (
              <DataGridComponent
                isLoading={isLoading}
                rows={mapRows(fetcheItemDetail as MaterialModel) ?? []}
                columns={columns}
              />
            )}
          </PageSection>
        </>
      )}
    </PageWrapper>
  );
};
