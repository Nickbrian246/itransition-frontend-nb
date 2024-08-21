import { createSlice } from "@reduxjs/toolkit";
import { Locale } from "@/types/types";

interface InitialState {
  locale: Locale;
}

const initialState: InitialState = {
  locale: "en",
};

export const locale = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, { payload }: { payload: Locale }) => {
      state.locale = payload;
    },
  },
});

export const { setLocale } = locale.actions;

export default locale.reducer;
