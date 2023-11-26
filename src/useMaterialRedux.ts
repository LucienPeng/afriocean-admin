import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from './Store/store';
import { MaterialTableRow } from './model/material.model';

export const useMaterialRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const itemCount = useSelector<RootState, number>((state) => state.material.itemCount);
  const selectedMaterialItem = useSelector<RootState, MaterialTableRow | null>((state) => state.material.selectedMaterialItem);

  return { dispatch, itemCount, selectedMaterialItem };
};
