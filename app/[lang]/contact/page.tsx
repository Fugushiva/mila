import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { EmergencyBanner } from "@/components/sections/EmergencyBanner";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { breadcrumbListJsonLd } from "@/lib/seo/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

export async function generateMetadata(
  props: PageProps<"/[lang]/contact">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/contact`])),
    },
    openGraph: {
      title: `${dict.contact.metaTitle} | ${dict.meta.siteName}`,
      description: dict.contact.metaDescription,
      url: `${SITE_URL}/${lang}/contact`,
      type: "website",
    },
  };
}

export default async function ContactPage(props: PageProps<"/[lang]/contact">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd(lang, [
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow={dict.contact.hero.eyebrow}
        title={dict.contact.hero.h1}
        subtitle={dict.contact.hero.subtitle}
      />

      <section className="bg-bg py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            <div className="lg:col-span-3">
              <ContactForm locale={lang} dict={dict.contact.form} />
            </div>
            <div className="lg:col-span-2">
              <ContactInfo locale={lang} />
            </div>
          </div>
        </Container>
      </section>

      <MapEmbed locale={lang} />
      <EmergencyBanner locale={lang} />

      <section className="relative overflow-hidden bg-primary py-20 text-text-inverse md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/15 blur-3xl"
        />
        <Container>
          <div className="text-center">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
              {dict.contact.ctaBand.eyebrow}
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-balance text-text-inverse md:text-5xl">
              {dict.contact.ctaBand.title}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/80">
              {dict.contact.ctaBand.intro}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="tel:+66971805845" external variant="primary" size="lg">
                {dict.contact.ctaBand.callLabel}
              </Button>
              <Button
                href="mailto:info@mila-law.com"
                external
                variant="ghost-dark"
                size="lg"
              >
                {dict.contact.ctaBand.secondaryLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
