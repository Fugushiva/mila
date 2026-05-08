import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CabinetHistory } from "@/components/sections/CabinetHistory";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { CTABand } from "@/components/sections/CTABand";
import { MahidolBlock } from "@/components/sections/MahidolBlock";
import { PageHero } from "@/components/sections/PageHero";
import { Pillars } from "@/components/sections/Pillars";
import { Stats } from "@/components/sections/Stats";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { breadcrumbListJsonLd } from "@/lib/seo/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

export async function generateMetadata(
  props: PageProps<"/[lang]/cabinet">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.cabinet.metaTitle,
    description: dict.cabinet.metaDescription,
    alternates: {
      canonical: `/${lang}/cabinet`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `/${l}/cabinet`]),
      ),
    },
    openGraph: {
      title: `${dict.cabinet.metaTitle} | ${dict.meta.siteName}`,
      description: dict.cabinet.metaDescription,
      url: `${SITE_URL}/${lang}/cabinet`,
      type: "website",
    },
  };
}

/**
 * PR #4 — Cabinet (about) page.
 * Sections, in order:
 *   1. PageHero (compact, navy gradient)
 *   2. CabinetHistory (2-col text + decorative card)
 *   3. Pillars (3 values: excellence / multicultural / availability)
 *   4. MahidolBlock (academic partnership highlight)
 *   5. CoverageMap (Thailand SVG + offices/interventions)
 *   6. Stats (4 numbers band, navy)
 *   7. CTABand (shared booking band)
 */
export default async function CabinetPage(
  props: PageProps<"/[lang]/cabinet">,
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd(lang, [
          { name: dict.nav.home, path: "/" },
          { name: dict.nav.cabinet, path: "/cabinet" },
        ])}
      />
      <PageHero
        eyebrow={dict.cabinet.hero.eyebrow}
        title={dict.cabinet.hero.h1}
        subtitle={dict.cabinet.hero.subtitle}
      />
      <CabinetHistory locale={lang} />
      <Pillars locale={lang} />
      <MahidolBlock locale={lang} />
      <CoverageMap locale={lang} />
      <Stats locale={lang} />
      <CTABand locale={lang} />
    </>
  );
}
