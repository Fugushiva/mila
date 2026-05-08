import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/sections/PageHero";
import { PillarSection } from "@/components/sections/PillarSection";
import { PillarsNav } from "@/components/sections/PillarsNav";
import { PILLARS } from "@/lib/data/pillars";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[lang]/expertises">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.expertises.title,
    description: dict.expertises.metaDescription,
  };
}

/**
 * PR #6 — Expertises page.
 * Sections, in order:
 *   1. PageHero (compact, navy gradient)
 *   2. PillarsNav (sticky, 4 in-page anchors)
 *   3. PillarSection × 4, alternating cream/white backgrounds
 *      - people / business / realestate / innovation
 *   4. CTABand (shared booking band)
 */
export default async function ExpertisesPage(
  props: PageProps<"/[lang]/expertises">,
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero
        eyebrow={dict.expertises.hero.eyebrow}
        title={dict.expertises.hero.h1}
        subtitle={dict.expertises.hero.subtitle}
      />
      <PillarsNav locale={lang} />
      {PILLARS.map((pillar, idx) => (
        <PillarSection
          key={pillar.id}
          locale={lang}
          pillar={pillar}
          alternate={idx % 2 === 1}
        />
      ))}
      <CTABand locale={lang} />
    </>
  );
}
