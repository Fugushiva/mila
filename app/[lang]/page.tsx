import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary, isLocale } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";

export async function generateMetadata(
  props: PageProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.home.title };
}

/**
 * PR #2 placeholder home — exercises the new layout + UI primitives so we can
 * eyeball Header/Footer/MobileMenu/LanguageSwitcher without the full Hero
 * (that ships in PR #3).
 *
 * Renders only Container + SectionHeading + Buttons — no real Hero yet.
 */
export default async function LocaleHome(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <Container as="section" className="py-24 md:py-32">
      <SectionHeading
        eyebrow={dict.meta.siteName}
        title={dict.home.hero.h1}
        intro={dict.home.hero.subtitle}
        as="h1"
      />
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button href={localizedPath(lang, "/contact")} variant="primary">
          {dict.common.ctaBookMeeting}
        </Button>
        <Button href={localizedPath(lang, "/expertises")} variant="secondary">
          {dict.common.ctaDiscoverExpertise}
        </Button>
      </div>
    </Container>
  );
}
