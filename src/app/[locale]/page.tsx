import Header from "@/components/header";
import TagsCarousel from "@/components/tags-carousel";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import initTranslations from "../i18n";
const i18nNamespaces = ["home"];

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
            maxWidth: "800px",
            alignSelf: "center",
          }}
        >
          <TagsCarousel />
        </section>
      </section>
    </TranslationsProvider>
  );
}
