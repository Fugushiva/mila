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

export async function generateMetadata(
  props: PageProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.home.title,
    description: dict.meta.description,
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

  return (
    <>
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
