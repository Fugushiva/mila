import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type EmergencyBannerProps = {
  locale: Locale;
};

export function EmergencyBanner({ locale }: EmergencyBannerProps) {
  const dict = getDictionary(locale);
  const { emergency } = dict.contact;

  return (
    <section className="border-y border-secondary/40 bg-secondary-soft/20 py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex items-start gap-4 md:gap-6">
            <AlertTriangle
              size={40}
              strokeWidth={1.5}
              aria-hidden
              className="flex-shrink-0 text-primary"
            />
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {emergency.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-xl font-medium text-primary md:text-2xl">
                {emergency.title}
              </h2>
              <p className="mt-2 font-sans text-base leading-relaxed text-text">
                {emergency.description}
              </p>
            </div>
          </div>

          <Button
            href="https://th.ambafrance.org/"
            target="_blank"
            external
            variant="secondary"
            size="md"
          >
            {emergency.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
