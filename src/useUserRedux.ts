import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthState } from './Store/Auth/auth.model';
import { Profile } from './model/model';

export const useUserRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<AuthState, unknown, AnyAction>>();
  const isLoggedIn = useSelector<AuthState, boolean>((state) => state.isLoggedIn);
  const userProfile = useSelector<AuthState, Profile | null>((state) => state.user);

  return { dispatch, isLoggedIn, userProfile };
};
