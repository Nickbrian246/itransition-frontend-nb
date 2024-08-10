import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/auth/auth-slice";
import theme from "./slices/theme/theme-slice";
export const store = configureStore({
  reducer: { user, theme },
});
