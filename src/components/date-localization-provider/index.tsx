import { FC, ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";
import dayjs from "dayjs";
dayjs.locale("es");
dayjs.locale("en");
interface Props {
  children: ReactNode;
}
export const DateLocalizationProvider: FC<Props> = ({ children }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
    {children}
  </LocalizationProvider>
);
