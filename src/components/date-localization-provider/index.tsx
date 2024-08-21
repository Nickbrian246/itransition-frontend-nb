import { FC, ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import "dayjs/locale/en";
import dayjs from "dayjs";
import { useAppSelector } from "@/hooks/use-redux/redux";
dayjs.locale("es");
dayjs.locale("en");
interface Props {
  children: ReactNode;
}
export const DateLocalizationProvider: FC<Props> = ({ children }) => {
  const locale = useAppSelector((state) => state.locale);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={locale.locale}
    >
      {children}
    </LocalizationProvider>
  );
};
