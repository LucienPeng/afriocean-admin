import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Profile } from './model/company.model';
import { RootState } from './Store/store';

export const useUserRedux = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const isLoggedIn = useSelector<RootState, boolean>((state) => state.auth.isLoggedIn);
  const profile = useSelector<RootState, Profile | null>((state) => state.auth.user);
  const role = profile?.role;
  const displayName = profile?.firstName;

  return { dispatch, isLoggedIn, profile, role, displayName };
};
