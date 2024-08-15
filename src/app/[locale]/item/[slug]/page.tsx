import React from "react";
import Header from "@/components/header";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import Item from "./_components/item";
import { getItemById } from "./_services";
const i18nNamespaces = ["auth", "commons", "password-rules", "menu-options"];
export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const { data } = await getItemById(slug);

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
        <Item item={data} />
      </section>
    </TranslationsProvider>
  );
}
