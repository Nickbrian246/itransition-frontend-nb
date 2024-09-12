import React from "react";
import type { Metadata } from "next";
import Header from "@/components/header";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import { getItemsByTagId, getTagById } from "./_services";
import Items from "./_components";
import { Locale } from "@/types/types";

type Props = {
  params: { locale: Locale; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagById(params.slug);
  return {
    title: tag.data.name,
  };
}
const i18nNamespaces = ["auth", "commons", "password-rules", "menu-options"];
export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const { data } = await getItemsByTagId(slug);

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
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Items slug={slug} locale={locale} />
      </section>
    </TranslationsProvider>
  );
}
