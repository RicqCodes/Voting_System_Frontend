import { createSlice } from "@reduxjs/toolkit";

const initialState = { EOA: null };

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateEOA: (state, { payload }) => {
      state.EOA = payload;
    },
  },
});

export const { updateEOA } = appSlice.actions;
export default appSlice.reducer;
