import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/sections/PageHero";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { breadcrumbListJsonLd, personJsonLd } from "@/lib/seo/jsonld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

export async function generateMetadata(
  props: PageProps<"/[lang]/equipe">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.team.title,
    description: dict.team.metaDescription,
    alternates: {
      canonical: `/${lang}/equipe`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}/equipe`])),
    },
    openGraph: {
      title: dict.team.title,
      description: dict.team.metaDescription,
      url: `${SITE_URL}/${lang}/equipe`,
      type: "website",
    },
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
      <JsonLd
        data={[
          breadcrumbListJsonLd(lang, [
            { name: dict.nav.home, path: "/" },
            { name: dict.nav.team, path: "/equipe" },
          ]),
          ...TEAM_MEMBERS.map((m) =>
            personJsonLd({
              name: dict.team.members[m.key].name,
              jobTitle: dict.team.members[m.key].role,
              email: m.email,
              knowsLanguage: m.languages.map((c) => dict.team.languages[c]),
            }),
          ),
        ]}
      />
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
