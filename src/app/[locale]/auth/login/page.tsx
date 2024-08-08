import React from "react";
import Login from "@/components/auth/login";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
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
      <Login />
    </TranslationsProvider>
  );
}
