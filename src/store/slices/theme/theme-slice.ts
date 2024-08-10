import { createSlice } from "@reduxjs/toolkit";
export type Theme = "DARK" | "LIGHT";

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
