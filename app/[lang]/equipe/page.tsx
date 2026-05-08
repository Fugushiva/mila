import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/sections/PageHero";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[lang]/equipe">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.team.title,
    description: dict.team.metaDescription,
  };
}

/**
 * PR #5 — Team page.
 * Sections, in order:
 *   1. PageHero (compact, navy gradient)
 *   2. TeamGrid (6 LawyerCards with bio, languages, email, LinkedIn)
 *   3. PublicationsSection (3 horizontal BookCards with ISBN)
 *   4. CTABand (shared booking band)
 */
export default async function EquipePage(
  props: PageProps<"/[lang]/equipe">,
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero
        eyebrow={dict.team.hero.eyebrow}
        title={dict.team.hero.h1}
        subtitle={dict.team.hero.subtitle}
      />
      <TeamGrid locale={lang} />
      <PublicationsSection locale={lang} />
      <CTABand locale={lang} />
    </>
  );
}
