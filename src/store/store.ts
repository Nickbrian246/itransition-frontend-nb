import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/auth/auth-slice";
import theme from "./slices/theme/theme-slice";
import locale from "./slices/current-locale";
export const store = configureStore({
  reducer: { user, theme, locale },
});
