import { BookMarked } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function MahidolBlock({ locale }: Props) {
  const dict = getDictionary(locale);
  const { mahidol } = dict.cabinet;

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-secondary/30 bg-gradient-to-br from-secondary-soft/30 via-bg to-bg p-8 shadow-md md:p-14 lg:p-16">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-center lg:gap-16">
            {/* Logo placeholder */}
            <div className="mx-auto flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-2xl border border-secondary/40 bg-surface p-6 text-center shadow-inner md:mx-0 md:h-56 md:w-56">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary">
                <BookMarked
                  strokeWidth={1.5}
                  size={28}
                  aria-hidden
                  className="text-primary"
                />
              </div>
              <p className="font-display text-xs font-medium uppercase tracking-[0.2em] text-primary md:text-sm">
                {mahidol.logoLabel}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-text-muted md:text-xs">
                {mahidol.logoSubtitle}
              </p>
            </div>

            {/* Text content */}
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {mahidol.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance text-primary md:text-4xl">
                {mahidol.title}
              </h2>
              <p className="mt-6 font-sans text-base leading-relaxed text-text-muted md:text-lg">
                {mahidol.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
