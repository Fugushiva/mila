import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function CTABand({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-primary py-20 text-text-inverse md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/15 blur-3xl"
      />
      <Container>
        <div className="text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            {dict.home.ctaBand.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-balance text-text-inverse md:text-5xl">
            {dict.home.ctaBand.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/80">
            {dict.home.ctaBand.intro}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={localizedPath(locale, "/contact")}
              variant="primary"
              size="lg"
            >
              {dict.common.ctaBookMeeting}
            </Button>
            <Button
              href="tel:+66971805845"
              external
              variant="ghost-dark"
              size="lg"
            >
              {dict.footer.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
