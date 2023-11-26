import { createSlice } from '@reduxjs/toolkit';
import { MaterialState } from './material.model';

const initialState: MaterialState = {
  itemCount: 0,
  selectedMaterialItem: null,
};

const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    setMaterial(state, actions) {
      state.itemCount = actions.payload.itemCount;
    },
    selectMaterial(state, actions) {
      state.selectedMaterialItem = actions.payload.selectedMaterialItem;
    },
  },
});

export const materialActions = materialSlice.actions;
export default materialSlice.reducer;
