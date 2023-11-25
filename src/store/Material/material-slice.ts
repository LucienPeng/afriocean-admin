import { createSlice } from '@reduxjs/toolkit';
import { MaterialState } from './material.model';

const initialState: MaterialState = {
  itemCount: 0,
};

const materialSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMaterial (state, actions) {
      state.itemCount = actions.payload.itemCount;;
    },
  },
});

export const materialActions = materialSlice.actions;
export default materialSlice.reducer;
