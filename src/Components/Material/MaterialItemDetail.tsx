import { PageWrapper } from '../Common/PageWrapper';
import { PageSection } from '../Common/PageSection';
import { MaterialItemForm } from './MaterialItemForm';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { useMaterialRedux } from '../../useMaterialRedux';
import { useQuery } from 'react-query';
import { Collections, useFirebaseDB } from '../../useFirebaseDB';
import {
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
import { DATE_TIME_FORMAT } from '../../model/application.model';
import { useCallback } from 'react';
import { useUserRedux } from '../../useUserRedux';

const OPERATION_VALUE = Object.values(Operation).filter((operation) => isNaN(Number(operation)));
const CALCULATION_VALUE = Object.values(Calculation).filter((operation) => isNaN(Number(operation)));

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date' },
  { field: 'initiateur', headerName: 'Initiateur' },
  { field: 'operation', headerName: 'Opération' },
  { field: 'calculation', headerName: 'Calcul' },
  { field: 'quantityToBeProcessed', headerName: 'Quantité' },
  { field: 'subtotalQuantity', headerName: 'Sous-total' },
];

const mapRows = (data: MaterialModel) => {
  if (!data) return;
  return data.record?.map((s, index) => {
    return {
      id: index,
      initiateur: s.initiateur,
      date: s.operationDate,
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
  quantityToBeProcessed: 0,
};

export const MaterialItemDetail = () => {
  const { selectedMaterialItem } = useMaterialRedux();
  const { getFirebaseDocumentData, setFirebaseData } = useFirebaseDB();

  const {
    refetch,
    data: fetcheItemDetail,
    isLoading,
  } = useQuery({
    queryKey: ['materialItemDetail'],
    queryFn: () => getFirebaseDocumentData('Material', String(selectedMaterialItem?.id) ?? ''),
  });

  const { control, watch, reset, getValues, handleSubmit } = useForm<MaterialQuantityFlow>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const parsedQuantity = parseInt(fetcheItemDetail?.quantity) || 0;
  const { profile } = useUserRedux();

  const updateItemQuantity = useCallback(() => {
    const { calculation, operation, quantityToBeProcessed } = getValues();
    const parsedOperationQuantity = Number(quantityToBeProcessed) || 0;
    const newData = { ...fetcheItemDetail };

    if (calculation === Calculation.IN) {
      newData.quantity += parsedOperationQuantity;
    } else if (calculation === Calculation.OUT) {
      newData.quantity -= parsedOperationQuantity;
    }

    newData.record = [
      ...(newData.record || []),
      {
        initiateur: profile?.firstName,
        operationDate: moment().format(DATE_TIME_FORMAT),
        operation,
        calculation,
        quantityToBeProcessed: parsedOperationQuantity,
        subtotalQuantity:
          calculation === Calculation.IN
            ? parsedQuantity + parsedOperationQuantity
            : parsedQuantity - parsedOperationQuantity,
      },
    ];

    setFirebaseData(Collections.Material, newData.id ?? '', newData);
    reset(DEFAULT_VALUES);
    refetch();
  }, [getValues, fetcheItemDetail, profile?.firstName, parsedQuantity, setFirebaseData, reset, refetch]);

  return (
    <PageWrapper icon={<InventoryIcon />} componentName="DETAIL" containerMaxWidth="lg">
      <PageSection>
        {!isLoading ? (
          <MaterialItemForm formMode={MaterialItemFormMode.EDIT} fetcheItemDetail={fetcheItemDetail as MaterialModel} />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </PageSection>

      <PageSection>
        <Stack width="100%" direction="column" spacing={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <Stack width="100%" direction="row" justifyContent="space-between" justifyItems="center">
                <StyledPaper sx={{ border: '1px solid', borderColor: 'text.primary' }}>
                  <Stack direction="column" alignItems="center" p={1} textAlign="center">
                    <Typography fontSize="25px" fontWeight={700} color="text.primary">
                      Current Total
                    </Typography>
                    <Typography fontSize="40px" fontWeight={700} color="text.primary">
                      {parsedQuantity}
                    </Typography>
                  </Stack>
                </StyledPaper>
                <Stack direction="column" justifyContent="center" justifyItems="center">
                  {watch('calculation') === Calculation.IN ? (
                    <Typography fontSize="30px" color="blue" fontWeight={700}>
                      ＋
                    </Typography>
                  ) : (
                    <Typography fontSize="30px" color="red" fontWeight={700}>
                      −
                    </Typography>
                  )}
                </Stack>
                <StyledPaper sx={{ border: '1px solid', borderColor: 'text.primary' }}>
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
                      {watch('quantityToBeProcessed')}
                    </Typography>
                  </Stack>
                </StyledPaper>
                <Stack direction="column" justifyContent="center" justifyItems="center">
                  <Typography fontSize="30px" color="text.primary" fontWeight={700}>
                    =
                  </Typography>
                </Stack>
                <StyledPaper sx={{ border: '1px solid', borderColor: 'text.primary' }}>
                  <Stack direction="column" alignItems="center" p={1} textAlign="center">
                    <Typography fontSize="25px" fontWeight={700} color="text.primary">
                      Stock en Resultat :
                    </Typography>
                    <Typography fontSize="40px" fontWeight={700} color="text.primary">
                      {watch('calculation') === Calculation.IN
                        ? parsedQuantity + Number(watch('quantityToBeProcessed'))
                        : parsedQuantity - Number(watch('quantityToBeProcessed'))}
                    </Typography>
                  </Stack>
                  <Typography fontSize="25px" fontWeight={700} color="text.primary"></Typography>
                </StyledPaper>
              </Stack>
            </Grid>
            <Grid item xs={4}>
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
                  render={({ field: { onChange, value } }) => (
                    <StyledTextField
                      fullWidth
                      onChange={onChange}
                      variant="outlined"
                      margin="normal"
                      required
                      id="quantityToBeProcessed"
                      label="Quantité"
                      value={value}
                    />
                  )}
                />
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" width="100%" spacing={2} justifyContent="center">
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
        {!isLoading && fetcheItemDetail && (
          <DataGridComponent
            isLoading={isLoading}
            rows={mapRows(fetcheItemDetail as MaterialModel) ?? []}
            columns={columns}
          />
        )}
      </PageSection>
    </PageWrapper>
  );
};
