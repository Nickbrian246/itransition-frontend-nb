"use client";
import { ReactNode, useEffect } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import ThemeProvider from "@/components/theme-provider/theme-provider";
import axios from "axios";
import { getAccessToken } from "@/utils/localstorage/localstorage";
import { DateLocalizationProvider } from "../date-localization-provider";
export default function ClientComponent({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);
  return (
    <section>
      <Provider store={store}>
        <DateLocalizationProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DateLocalizationProvider>
      </Provider>
    </section>
  );
}
