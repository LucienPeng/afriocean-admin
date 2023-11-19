import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AuthState } from './Store/Auth/auth.model';
import { Profile } from './model/model';

export const useUserRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<AuthState, unknown, AnyAction>>();
  const isLoggedIn = useSelector<AuthState, boolean>((state) => state.isLoggedIn);
  const profile = useSelector<AuthState, Profile | null>((state) => state.user);
  const role = profile?.role
  const displayName = profile?.firstName

  return { dispatch, isLoggedIn, profile, role, displayName };
};
