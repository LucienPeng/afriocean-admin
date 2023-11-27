import { createSlice } from '@reduxjs/toolkit';
import { MaterialState } from './material.model';

const initialState: MaterialState = {
  materialItemDetail: null,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    selectMaterial(state, actions) {
      state.materialItemDetail = actions.payload.selectedMaterialItem;
    },
  },
});

export const materialActions = materialSlice.actions;
export default materialSlice.reducer;
