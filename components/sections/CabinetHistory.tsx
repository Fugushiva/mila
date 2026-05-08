import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function CabinetHistory({ locale }: Props) {
  const dict = getDictionary(locale);
  const { history } = dict.cabinet;
  const currentYear = new Date().getFullYear();

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — text */}
          <div>
            <SectionHeading
              eyebrow={history.eyebrow}
              title={history.title}
              as="h2"
              align="left"
            />
            <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-text-muted">
              <p>{history.paragraphs.p1}</p>
              <p>{history.paragraphs.p2}</p>
              <p>{history.paragraphs.p3}</p>
            </div>
          </div>

          {/* Right — decorative visual card (no bitmap) */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-soft to-primary shadow-xl">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(200,169,106,0.2),_transparent_50%)]"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/15 blur-3xl"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                2012 — {currentYear}
              </p>
              <p className="mt-3 font-display text-2xl font-medium leading-tight text-balance text-text-inverse md:text-3xl">
                {history.title}
              </p>
            </div>
            <div
              aria-hidden
              className="absolute right-8 top-8 h-12 w-12 rounded-full border border-secondary/30"
            />
            <div
              aria-hidden
              className="absolute right-14 top-14 h-12 w-12 rounded-full border border-secondary/20"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
