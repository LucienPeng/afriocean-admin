import { PageSection } from '../../Common/PageSection';
import { DataGridComponent } from '../../Common/StyledUI/StyledDataGrid';
import { MaterialModel, Warehouse } from '../../../model/material.model';
import { useMaterialRecordTable } from './useMaterialRecordTable';
import { Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

interface ItemDetailRecordTableProps {
  readonly refetch: () => void;
  readonly fetcheItemDetail: MaterialModel | undefined;
  readonly isLoading: boolean;
  readonly isFetching: boolean;
}

export const MaterialItemDetailRecordTable = (props: ItemDetailRecordTableProps) => {
  const { fetcheItemDetail, isLoading, isFetching, refetch } = props;
  const { columns, rows, warehouse, setWarehouse } = useMaterialRecordTable({ fetcheItemDetail, refetch });

  const handleChangeWarehouse = (_event: SyntheticEvent, warehouse: Warehouse) => setWarehouse(warehouse);

  return (
    <PageSection>
      <Stack width="100%" direction='column' spacing={5}>
        <Stack width="100%">
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={warehouse}
            onChange={handleChangeWarehouse}
            variant="fullWidth"
            aria-label="warehouse-tab"
          >
            <Tab label="Magasin SN" value={Warehouse.SN} />
            <Tab label="Magasin TW" value={Warehouse.TW} />
          </Tabs>
        </Stack>
        {fetcheItemDetail && (
          <DataGridComponent isLoading={isLoading} isFetching={isFetching} rows={rows} columns={columns} />
        )}
      </Stack>
    </PageSection>
  );
};
