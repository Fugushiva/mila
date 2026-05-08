import { Container } from "@/components/ui/Container";

export type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

/**
 * Compact inner-page hero (~40vh). Reusable across cabinet, team,
 * expertises, contact pages. Callers pass strings directly — no locale/dict.
 *
 * Background: navy gradient with golden radial glow. Bottom fade to cream.
 */
export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-soft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl"
      />
      <Container className="relative py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance text-text-inverse md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/85 md:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  );
}
