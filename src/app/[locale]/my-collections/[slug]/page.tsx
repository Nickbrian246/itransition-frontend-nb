import React from "react";
import Header from "@/components/header";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import Collections from "../_componets";
import { Locale } from "@/types/types";
import { Metadata } from "next";
import { getCollectionsByUserId, getUserById } from "../_services";

const i18nNamespaces = ["auth", "commons", "password-rules", "menu-options"];

type Props = {
  params: { locale: Locale; slug: string };
  searchParams: { name: string };
};

export async function generateMetadata({
  params: { locale, slug },
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `${searchParams.name}´s collection`,
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
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Collections userId={slug} />
      </section>
    </TranslationsProvider>
  );
}
