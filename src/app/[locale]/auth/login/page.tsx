import React from "react";
import Login from "@/components/auth/login";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import Header from "@/components/header";
import { Locale } from "@/types/types";
import { Metadata } from "next";

const i18nNamespaces = ["auth", "commons", "password-rules", "menu-options"];
type Props = {
  params: { locale: Locale; slug: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  return {
    title: locale === "en" ? "Sign in" : "Iniciar sesión",
  };
}
export default async function Page({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header locale={locale} />
      <Login />
    </TranslationsProvider>
  );
}
