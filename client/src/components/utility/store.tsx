import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeDataSlice"

export const store = configureStore({
  reducer: {
    animeData: animeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
