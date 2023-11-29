import { PageSection } from '../../Common/PageSection';
import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
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
import { Calculation, MaterialModel, MaterialQuantityFlow, Operation } from '../../../model/material.model';
import { Controller, useForm } from 'react-hook-form';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { StyledPaper } from '../../Common/StyledUI/StyledPaper';
import { DATE_TIME_FORMAT } from '../../../model/application.model';
import { ChangeEvent, useCallback } from 'react';
import { useUserRedux } from '../../../useUserRedux';
import moment from 'moment';

const OPERATION_VALUE = Object.values(Operation).filter((operation) => isNaN(Number(operation)));
const CALCULATION_VALUE = Object.values(Calculation).filter((operation) => isNaN(Number(operation)));

const DEFAULT_VALUES = {
  operation: Operation.INANDOUT,
  calculation: Calculation.OUT,
  quantityToBeProcessed: '',
};

interface ItemDetailCalculatorProps {
  readonly refetch: () => void;
  readonly fetcheItemDetail: MaterialModel | undefined;
  readonly isFetching: boolean;
}

export const MaterialItemDetailCalculator = (props: ItemDetailCalculatorProps) => {
  const { setFirebaseData } = useFirebaseDB();
  const { profile } = useUserRedux();
  const { refetch, fetcheItemDetail, isFetching } = props;
  const { control, watch, reset, getValues, handleSubmit, setValue } = useForm<MaterialQuantityFlow>({
    mode: 'onSubmit',
    defaultValues: DEFAULT_VALUES,
  });

  const { calculation, operation } = getValues();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === '' || regex.test(e.target.value)) {
      const value = parseInt(e.target.value);
      const newValue = isNaN(value) ? '' : parseInt(e.target.value);
      setValue('quantityToBeProcessed', newValue);
    }
  };

  const totalQuantity: number = Number(fetcheItemDetail?.totalQuantity) || 0;
  const quantityToBeProcessed: number = Number(watch('quantityToBeProcessed')) || 0;

  const updateItemQuantity = useCallback(async () => {
    if (!fetcheItemDetail) return;
    const newData = { ...fetcheItemDetail };

    let updatedTotalQuantity = 0;

    if (calculation === Calculation.IN) {
      updatedTotalQuantity = totalQuantity + (quantityToBeProcessed as number);
    } else if (calculation === Calculation.OUT) {
      updatedTotalQuantity = totalQuantity - (quantityToBeProcessed as number);
    }

    newData.totalQuantity = updatedTotalQuantity;

    newData.record = [
      ...(newData.record || []),
      {
        initiateur: profile?.firstName ?? '',
        operationDate: moment().format(DATE_TIME_FORMAT),
        operation,
        calculation,
        quantityToBeProcessed,
        subtotalQuantity: updatedTotalQuantity,
      },
    ];

    await setFirebaseData(Collections.Material, String(newData.id), newData);
    refetch();
    reset(DEFAULT_VALUES);
  }, [
    calculation,
    fetcheItemDetail,
    operation,
    profile?.firstName,
    quantityToBeProcessed,
    refetch,
    reset,
    setFirebaseData,
    totalQuantity,
  ]);

  return (
    <PageSection>
      <Stack width="100%" direction="column" justifyContent="center" alignItems="center" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={7}>
            <Stack width="100%" direction="column" justifyContent="space-between" justifyItems="center" spacing={3}>
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
                      {watch('calculation') === Calculation.IN
                        ? '+' + ' ' + quantityToBeProcessed
                        : '-' + ' ' + quantityToBeProcessed}
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
                      ? totalQuantity + (quantityToBeProcessed as number)
                      : totalQuantity - (quantityToBeProcessed as number)}
                  </Typography>
                </Stack>
                <Typography fontSize="25px" fontWeight={700} color="text.primary"></Typography>
              </StyledPaper>
            </Stack>
          </Grid>
          <Grid item xs={5} pr={3}>
            <Stack width="100%" direction="column" justifyContent="center" alignItems="center" spacing={3}>
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
  );
};
