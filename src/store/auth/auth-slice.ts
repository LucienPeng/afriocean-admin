import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.model';

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceed(state) {
      state.isLoggedIn = true;
    },
    loginFaild(state) {
      state.isLoggedIn = false;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
