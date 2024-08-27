"use client";
import ThemeProvider from "@/components/theme-provider/theme-provider";
import { store } from "@/store/store";
import axios from "axios";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { DateLocalizationProvider } from "../date-localization-provider";
export default function ClientComponent({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   axios.defaults.headers.Authorization = `Bearer ${token}`;
  // }, []);
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
