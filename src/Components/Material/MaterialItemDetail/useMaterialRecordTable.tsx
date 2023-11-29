import { Collections, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { Calculation, MaterialModel, MaterialQuantityFlow, Operation } from '../../../model/material.model';
import { GridActionsCellItem, GridColDef, GridRowId, GridValidRowModel } from '@mui/x-data-grid';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../model/application.model';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useUserRedux } from '../../../useUserRedux';
import { Roles } from '../../../model/company.model';

const OPERATION_VALUE = Object.values(Operation).filter((operation) => isNaN(Number(operation)));
const CALCULATION_VALUE = Object.values(Calculation).filter((operation) => isNaN(Number(operation)));

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

interface MaterialRecordTableProps {
  readonly refetch: () => void;
  readonly fetcheItemDetail: MaterialModel | undefined;
}

export const useMaterialRecordTable = (props: MaterialRecordTableProps) => {
  const { role } = useUserRedux();
  const { fetcheItemDetail, refetch } = props;
  const { setFirebaseData } = useFirebaseDB();

  const rows = mapRows(fetcheItemDetail as MaterialModel) ?? [];
  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      headerAlign: 'center',
      align: 'center',
      editable: role === Roles.ADMIN,
      flex: 1,
    },
    {
      field: 'initiateur',
      headerName: 'Initiateur',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: role === Roles.ADMIN,
      type: 'string',
    },
    {
      field: 'operation',
      headerName: 'Opération',
      headerAlign: 'center',

      align: 'center',
      flex: 1,
      editable: role === Roles.ADMIN,
      type: 'singleSelect',
      valueOptions: OPERATION_VALUE,
    },
    {
      field: 'calculation',
      headerName: 'Calcul',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: role === Roles.ADMIN,
      type: 'singleSelect',
      valueOptions: CALCULATION_VALUE,
    },
    {
      field: 'quantityToBeProcessed',
      headerName: 'Quantité',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: role === Roles.ADMIN,
      type: 'number',
    },
    {
      field: 'subtotalQuantity',
      headerName: 'Sous-total',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      editable: role === Roles.ADMIN,
      type: 'number',
    },
    role === Roles.ADMIN
      ? {
          field: 'actions',
          type: 'actions',
          align: 'center',
          flex: 1,
          headerAlign: 'center',
          headerName: 'Actions',
          cellClassName: 'actions',
          getActions: ({ id, row }) => {
            return [
              <GridActionsCellItem
                key="save"
                icon={
                  <Tooltip title="Save">
                    <SaveIcon />
                  </Tooltip>
                }
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id, row)}
              />,
              <GridActionsCellItem
                key="cancel"
                icon={
                  <Tooltip title="Delete">
                    <CancelIcon color="error" />
                  </Tooltip>
                }
                label="Cancel"
                className="textPrimary"
                onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          },
        }
      : ({} as GridColDef),
  ];

  const handleSaveClick = (id: GridRowId, row: GridValidRowModel) => async () => {
    if (fetcheItemDetail) {
      const newData = { ...fetcheItemDetail };
      newData.record[id as number] = row as MaterialQuantityFlow;

      await setFirebaseData(Collections.Material, String(fetcheItemDetail?.id), newData);
      refetch();
    }
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    if (fetcheItemDetail) {
      const newData = { ...fetcheItemDetail };
      const newRecord = newData.record.filter((_item, index) => index !== id);
      newData.record = newRecord;

      await setFirebaseData(Collections.Material, String(fetcheItemDetail?.id), newData);
      refetch();
    }
  };
  return { columns, rows };
};
