import { configureStore } from "@reduxjs/toolkit";
import seasonDataReducer from "./seasonDataSlice"

export const store = configureStore({
  reducer: {
    seasonData: seasonDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
