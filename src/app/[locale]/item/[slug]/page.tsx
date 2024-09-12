import initTranslations from "@/app/i18n";
import Header from "@/components/header";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import { Locale } from "@/types/types";
import Item from "./_components/item";
import { getItemById } from "./_services";
import { Metadata } from "next";
const i18nNamespaces = [
  "auth",
  "commons",
  "password-rules",
  "menu-options",
  "errors",
];

type Props = {
  params: { locale: Locale; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getItemById(params.slug);
  return {
    title: item.data.name,
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
        <Item slug={slug} />
      </section>
    </TranslationsProvider>
  );
}
