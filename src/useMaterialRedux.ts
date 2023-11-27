import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from './Store/store';
import { MaterialTableRow } from './model/material.model';

export const useMaterialRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const materialItemDetail = useSelector<RootState, MaterialTableRow | null>(
    (state) => state.material.materialItemDetail,
  );

  return { dispatch, materialItemDetail };
};
