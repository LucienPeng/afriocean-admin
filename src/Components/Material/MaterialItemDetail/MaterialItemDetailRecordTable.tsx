import { PageSection } from '../../Common/PageSection';
import { DataGridComponent } from '../../Common/StyledUI/StyledDataGrid';
import { MaterialModel } from '../../../model/material.model';
import { useMaterialRecordTable } from './useMaterialRecordTable';

interface ItemDetailRecordTableProps {
  readonly refetch: () => void;
  readonly fetcheItemDetail: MaterialModel | undefined;
  readonly isLoading: boolean;
  readonly isFetching: boolean;
}

export const MaterialItemDetailRecordTable = (props: ItemDetailRecordTableProps) => {
  const { fetcheItemDetail, isLoading, isFetching, refetch } = props;
  const { columns, rows } = useMaterialRecordTable({ fetcheItemDetail, refetch });

  return (
    <PageSection>
      {fetcheItemDetail && (
        <DataGridComponent isLoading={isLoading} isFetching={isFetching} rows={rows} columns={columns} />
      )}
    </PageSection>
  );
};
