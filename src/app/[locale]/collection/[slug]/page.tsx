import initTranslations from "@/app/i18n";
import Header from "@/components/header";
import TranslationsProvider from "@/components/translations-provider/translations-provider";
import CollectionPage from "./_components";
const i18nNamespaces = ["home", "menu-options", "feed", "commons"];
export default async function Page({
  params: { locale, slug },
}: {
  params: { slug: string; locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

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
        <CollectionPage slug={slug} />
      </section>
    </TranslationsProvider>
  );
}
