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
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;