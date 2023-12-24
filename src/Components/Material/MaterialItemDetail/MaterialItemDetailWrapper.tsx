import { PageWrapper } from '../../Common/PageWrapper';
import { useQuery } from '@tanstack/react-query';
import { useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { Backdrop, CircularProgress } from '@mui/material';
import { MaterialModel } from '../../../model/material.model';
import { useParams } from 'react-router';
import { MaterialItemDetailCalculator } from './MaterialItemDetailCalculator';
import { MaterialItemDetailRecordTable } from './MaterialItemDetailRecordTable';
import { MaterialItemDetailForm } from './MaterialItemDetailForm';
import InventoryIcon from '@mui/icons-material/Inventory';

const useMaterialItemDetail = (id: string | undefined) => {
  const { getFirebaseDocumentData } = useFirebaseDB();
  const {
    refetch,
    data: fetcheItemDetail,
    isLoading,
    isFetching,
  } = useQuery<MaterialModel>({
    queryKey: ['materialItemDetail', id],
    queryFn: () => getFirebaseDocumentData('Material', id ?? '') as Promise<MaterialModel>,
    enabled: !!id,
  });

  return { refetch, fetcheItemDetail, isLoading, isFetching };
};

export const MaterialItemDetail = () => {
  const { id } = useParams();
  const { refetch, fetcheItemDetail, isLoading, isFetching } = useMaterialItemDetail(id);
  const componentTitle: string = fetcheItemDetail ? `${fetcheItemDetail?.id} / ${fetcheItemDetail?.materialName}` : '';

  return (
    <PageWrapper icon={<InventoryIcon />} componentName={componentTitle} containerMaxWidth="lg">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {!isLoading && (
        <>
          <MaterialItemDetailForm fetcheItemDetail={fetcheItemDetail} />
          <MaterialItemDetailCalculator refetch={refetch} fetcheItemDetail={fetcheItemDetail} isFetching={isFetching} />
          <MaterialItemDetailRecordTable
            refetch={refetch}
            fetcheItemDetail={fetcheItemDetail}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </>
      )}
    </PageWrapper>
  );
};
