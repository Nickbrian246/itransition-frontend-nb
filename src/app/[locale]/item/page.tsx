import React from "react";
import Header from "@/components/header";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import Item from "./_components/item";
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
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Item />
      </section>
    </TranslationsProvider>
  );
}
