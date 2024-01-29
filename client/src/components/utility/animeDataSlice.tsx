import { animeIDType } from "@/vite-env";
import { createSlice } from "@reduxjs/toolkit";


const initialState: animeIDType[] | null = null;

const animeDataSlice = createSlice({
  name: "animeData",
  initialState,
  reducers: {
    setAnimeData: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setAnimeData } = animeDataSlice.actions;

export default animeDataSlice.reducer;