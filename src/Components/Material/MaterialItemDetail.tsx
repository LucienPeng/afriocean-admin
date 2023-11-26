import { PageWrapper } from '../Common/PageWrapper';
import { PageSection } from '../Common/PageSection';
import { MaterialItemForm } from './MaterialItemForm';
import { DataGridComponent } from '../Common/StyledUI/StyledDataGrid';
import { useMaterialRedux } from '../../useMaterialRedux';
import { useQuery } from 'react-query';
import { Collections, useFirebaseDB } from '../../useFirebaseDB';
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import {
  MaterialItemFormMode,
  MaterialModel,
  MaterialQuantityFlow,
  QuantityOperation,
} from '../../model/material.model';
import { GridColDef } from '@mui/x-data-grid';
import { Controller, useForm } from 'react-hook-form';
import { StyledTextField } from '../Common/StyledUI/StyledTextField';
import InventoryIcon from '@mui/icons-material/Inventory';

const OPERATION_VALUE = Object.values(QuantityOperation).filter((operation) => isNaN(Number(operation)));

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date' },
  { field: 'initiateur', headerName: 'Initiateur' },
  { field: 'operation', headerName: 'Operation' },
  { field: 'operationQuantity', headerName: 'Quantity' },
  { field: 'totalQuantity', headerName: 'Total Quantity' },
];

const mapRows = (data: MaterialModel) => {
  if (!data) return;
  return data.record?.map((s, i) => {
    return {
      id: i,
      date: data.date,
      initiateur: data.initiateur,
      operation: s.operation,
      operationQuantity: s.operationQuantity,
      totalQuantity: s.totalQuantity,
    };
  });
};

export const MaterialItemDetail = () => {
  const { selected } = useMaterialRedux();
  const { getFirebaseDocumentData, setFirebaseData } = useFirebaseDB();

  const { refetch, data, isLoading } = useQuery({
    queryKey: ['materialItemDetail', selected?.id],
    queryFn: () => getFirebaseDocumentData('Material', selected?.id ?? ''),
  });

  const { control, getValues, handleSubmit } = useForm<MaterialQuantityFlow>({
    mode: 'onSubmit',
    defaultValues: {
      operation: QuantityOperation.INCREASE,
      operationQuantity: 0,
    },
  });

  //console.log(data);

  const submit = () => {
    const { operation, operationQuantity } = getValues();
    const parsedQuantity = Number(data?.quantity) || 0; // Convert quantity to a number, defaulting to 0 if it's undefined or NaN
    const parsedOperationQuantity = Number(operationQuantity) || 0; // Convert operationQuantity to a number, defaulting to 0 if it's undefined or NaN

    console.log(operation);
    const DD = {
      ...data,
      quantity: parsedQuantity + parsedOperationQuantity, // Perform addition with parsed quantities
      record: [
        ...(data?.record || []),
        {
          date: data?.date,
          operation,
          operationQuantity: parsedOperationQuantity, // Use parsed operation quantity
          totalQuantity: parsedQuantity + parsedOperationQuantity, // Ca
        },
      ],
    };
    console.log(DD);
    if (operation === QuantityOperation.INCREASE) {
      // setFirebaseData(Collections.Material, data?.id ?? '', DD);
    } else {
      setFirebaseData(Collections.Material, data?.id ?? '', {
        ...data,
        quantity: Number(data?.quantity) ?? 0 + operationQuantity,
        record: [
          ...(data?.record || []),
          {
            date: data?.date,
            operation,
            operationQuantity,
            totalQuantity: data?.quantity ?? 0 - operationQuantity,
          },
        ],
      });
    }
    // refetch();
  };

  return (
    <PageWrapper icon={<InventoryIcon />} componentName="DETAIL" containerMaxWidth="lg">
      <PageSection>
        {!isLoading ? (
          <MaterialItemForm formMode={MaterialItemFormMode.EDIT} fetcheItemDetail={data as MaterialModel} />
        ) : (
          <CircularProgress color="secondary" />
        )}
      </PageSection>

      <PageSection>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Total : {data?.quantity}
          </Grid>
          <Grid item xs={6}>
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
                name="operationQuantity"
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
                    label="Quantité"
                    value={value}
                  />
                )}
              />
              <Stack direction="row" width="100%" spacing={2} justifyContent="flex-end">
                <Button variant="contained" color="error">
                  Anuler
                </Button>
                <Button variant="contained" onClick={handleSubmit(submit)}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </PageSection>

      <PageSection>
        {!isLoading && data && (
          <DataGridComponent isLoading={isLoading} rows={mapRows(data as MaterialModel) ?? []} columns={columns} />
        )}
      </PageSection>
    </PageWrapper>
  );
};
