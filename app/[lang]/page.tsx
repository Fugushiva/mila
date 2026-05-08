import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BooksSection } from "@/components/sections/BooksSection";
import { CTABand } from "@/components/sections/CTABand";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { Hero } from "@/components/sections/Hero";
import { TeamPreview } from "@/components/sections/TeamPreview";
import { TrustBar } from "@/components/sections/TrustBar";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import { BOOKS } from "@/lib/data/books";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import {
  bookJsonLd,
  breadcrumbListJsonLd,
  legalServiceJsonLd,
} from "@/lib/seo/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

export async function generateMetadata(
  props: PageProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  // Home uses the layout's title.default (full brand+tagline), no template
  // override here. og:title is set explicitly to match a clean SERP.
  const ogTitle = `${dict.home.metaTitle} | ${dict.meta.siteName}`;
  return {
    title: { absolute: ogTitle },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: ogTitle,
      description: dict.meta.description,
      url: `${SITE_URL}/${lang}`,
      type: "website",
    },
  };
}

/**
 * PR #3 — Home page.
 * Sections, in order:
 *   1. Hero (full-bleed, 85vh, Bangkok skyline)
 *   2. TrustBar (publishers wordmarks)
 *   3. ValueProposition (4 USPs)
 *   4. ExpertiseGrid (12 cards preview)
 *   5. TeamPreview (Pr. Stasi lead + 3 secondary)
 *   6. BooksSection (3 publications)
 *   7. CTABand (booking + tel)
 */
export default async function LocaleHome(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={[
          legalServiceJsonLd(lang, {
            name: dict.meta.siteName,
            description: dict.meta.description,
          }),
          breadcrumbListJsonLd(lang, [{ name: dict.nav.home, path: "/" }]),
          ...BOOKS.map((b) =>
            bookJsonLd({
              name: dict.home.books.items[b.key].title,
              isbn: b.isbn,
              publisher: dict.home.books.items[b.key].publisher,
              datePublished: dict.home.books.items[b.key].year,
            }),
          ),
        ]}
      />
      <Hero locale={lang} />
      <TrustBar locale={lang} />
      <ValueProposition locale={lang} />
      <ExpertiseGrid locale={lang} />
      <TeamPreview locale={lang} />
      <BooksSection locale={lang} />
      <CTABand locale={lang} />
    </>
  );
}
