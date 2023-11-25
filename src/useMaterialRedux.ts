import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from './Store/store';

export const useMaterialRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const itemCount = useSelector<RootState, number>((state) => state.material.itemCount);

  return { dispatch, itemCount };
};
