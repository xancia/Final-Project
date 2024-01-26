import { createSlice } from "@reduxjs/toolkit";

const initialState: null = null;

const seasonDataSlice = createSlice({
  name: "seasonData",
  initialState,
  reducers: {
    setSeasonData: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setSeasonData } = seasonDataSlice.actions;

export default seasonDataSlice.reducer;