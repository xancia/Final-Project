/* eslint-disable @typescript-eslint/no-explicit-any */
import { userType } from "@/vite-env";
import { createSlice } from "@reduxjs/toolkit";


const initialState: userType | null = null;

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (_state, action) => {
      return action.payload;
    },
    addSavedAnime: (state:any, action) => {
      if (state && 'animeList' in state) {
        state.animeList.push(action.payload);
      }
    },
    removeSavedAnime: (state:any, action) => {
      state.animeList = state.animeList.filter((anime: { mal_id: number; }) => anime.mal_id !== action.payload);
    },
  },
});

export const { setUserData, addSavedAnime, removeSavedAnime} = userDataSlice.actions;

export default userDataSlice.reducer;