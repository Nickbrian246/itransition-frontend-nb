import React from "react";
import Register from "@/components/auth/register/register";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import Header from "@/components/header";
const i18nNamespaces = ["auth", "commons", "password-rules"];
export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />
      <Register />
    </TranslationsProvider>
  );
}
