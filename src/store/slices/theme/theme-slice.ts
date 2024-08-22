import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "@/types/types";

interface InitialState {
  theme: Theme;
}

const initialState: InitialState = {
  theme: "LIGHT",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }: { payload: Theme }) => {
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
