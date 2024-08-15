import Header from "@/components/header";
import TagsCarousel from "@/components/tags-carousel";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import initTranslations from "../i18n";
import Collections from "@/components/collections";
import Items from "@/components/items";
const i18nNamespaces = ["home", "menu-options", "feed", "commons"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      locale={locale}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <section
          style={{
            maxWidth: "1200px",
            display: "flex",
            margin: "auto",
          }}
        >
          <TagsCarousel />
        </section>
        <section
          style={{
            maxWidth: "1200px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Collections />
          <Items />
        </section>
      </section>
    </TranslationsProvider>
  );
}
