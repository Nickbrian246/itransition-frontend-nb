"use client";
import { ReactNode } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import ThemeProvider from "@/components/theme-provider/theme-provider";
export default function ClientComponent({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <section>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </section>
  );
}
