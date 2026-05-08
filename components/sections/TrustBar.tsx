import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function TrustBar({ locale }: Props) {
  const dict = getDictionary(locale);
  const logos = dict.home.trustBar.logos;

  return (
    <section className="border-y border-border bg-bg py-10 md:py-12">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-text-muted">
          {dict.home.trustBar.label}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          <span className="font-display text-2xl font-medium tracking-wide text-primary/80 md:text-3xl">
            {logos.springer}
          </span>
          <span className="font-display text-2xl font-medium tracking-wide text-primary/80 md:text-3xl">
            {logos.brill}
          </span>
          <span className="font-display text-2xl font-medium tracking-wide text-primary/80 md:text-3xl">
            {logos.cengage}
          </span>
          <span className="font-display text-2xl font-medium tracking-wide text-primary/80 md:text-3xl">
            {logos.mahidol}
          </span>
        </div>
      </Container>
    </section>
  );
}
