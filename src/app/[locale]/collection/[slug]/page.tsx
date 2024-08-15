import initTranslations from "@/app/i18n";
import Header from "@/components/header";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import React from "react";
import { getCollectionById, getItemsByCollectionId } from "./_services";
import Collection from "./_components/collection";
import Items from "./_components/items";
import EmptyContent from "@/components/empty-content";
const i18nNamespaces = ["home", "menu-options", "feed", "commons"];
export default async function Page({
  params: { locale, slug },
}: {
  params: { slug: string; locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const {
    data: { category, description, name, id, updatedAt, imageId, items },
  } = await getCollectionById(slug);
  const { data } = await getItemsByCollectionId(slug);

  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <Header />
      <section
        style={{ maxWidth: "1000px", margin: "auto", marginTop: "40px" }}
      >
        <Collection
          category={category}
          date={updatedAt}
          description={description}
          id={id}
          imgId="hello"
          itemsCount={items?.length ?? 0}
          title={name}
          key={id}
        />
        {data.length === 0 ? (
          <EmptyContent text={t("commons:noItems")} />
        ) : (
          <Items items={data} />
        )}
      </section>
    </TranslationsProvider>
  );
}
