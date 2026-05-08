import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function Hero({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-primary">
      <div className="relative flex min-h-[85vh] items-center">
        <Image
          src="/images/hero/bangkok-skyline.jpg"
          alt={dict.home.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-primary/60" />
        <Container className="relative z-10 py-24 md:py-32">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            MILA — INTERNATIONAL LEGAL ADVICE
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance text-text-inverse md:text-6xl lg:text-7xl">
            {dict.home.hero.h1}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/85 md:text-xl">
            {dict.home.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              href={localizedPath(locale, "/contact")}
              variant="primary"
              size="lg"
            >
              {dict.common.ctaBookMeeting}
            </Button>
            <Button
              href={localizedPath(locale, "/expertises")}
              variant="ghost-dark"
              size="lg"
            >
              {dict.common.ctaDiscoverExpertise}
            </Button>
          </div>
        </Container>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  );
}
