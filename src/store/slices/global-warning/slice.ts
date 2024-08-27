import { createSlice } from "@reduxjs/toolkit";
import { Severity, Theme } from "@/types/types";

export interface GlobalWarningState {
  severity: Severity;
  message: string;
  duration?: number;
  isActive: boolean;
}

const initialState: GlobalWarningState = {
  isActive: false,
  message: "",
  severity: "success",
  duration: 3000,
};

export const globalWarningSlice = createSlice({
  name: "global warning",
  initialState,
  reducers: {
    setGlobalWarning: (
      state,
      { payload }: { payload: Omit<GlobalWarningState, "isActive"> }
    ) => {
      return (state = { ...payload, isActive: true });
    },
    disableGlobalWarning: (state) => {
      return (state = initialState);
    },
  },
});

export const { setGlobalWarning, disableGlobalWarning } =
  globalWarningSlice.actions;

export default globalWarningSlice.reducer;
