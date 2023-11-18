import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthState } from './store/auth/auth.model';

export const useUserRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<AuthState, unknown, AnyAction>>();
  const isLoggedIn = useSelector<AuthState, boolean>((state) => state.isLoggedIn);

  return { dispatch, isLoggedIn };
};
