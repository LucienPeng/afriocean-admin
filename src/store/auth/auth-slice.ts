import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.model';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    stillLoggedIn (state, actions) {
      state.isLoggedIn = actions.payload.isLoggedIn;
    },
    loginSucceed (state, actions) {
      state.isLoggedIn = true;
      state.user = actions.payload.user;
    },
    loginFaild (state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    logOut (state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
