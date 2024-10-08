import React from "react";
import Header from "@/components/header";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";

import { Locale } from "@/types/types";
import Dashboard from "./_components";
import { Metadata } from "next";

const i18nNamespaces = [
  "auth",
  "commons",
  "password-rules",
  "menu-options",
  "userHeaders",
  "errors",
];

type Props = {
  params: { locale: Locale; slug: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  return {
    title: locale === "en" ? "Users dashboard" : "Panel de usuarios",
  };
}
export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header locale={locale} />
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          gap: "40px",
        }}
      >
        <Dashboard />
      </section>
    </TranslationsProvider>
  );
}
