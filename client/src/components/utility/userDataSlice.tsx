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
    }
  },
});

export const { setUserData, addSavedAnime } = userDataSlice.actions;

export default userDataSlice.reducer;