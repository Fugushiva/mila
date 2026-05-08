import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

const STATS_KEYS = [
  "experience",
  "languages",
  "expertises",
  "lawyers",
] as const;

export function Stats({ locale }: Props) {
  const dict = getDictionary(locale);
  const { stats } = dict.cabinet;

  return (
    <section className="bg-primary py-16 text-text-inverse md:py-24">
      <Container>
        {/* Inline heading — SectionHeading uses text-primary, invisible on navy */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            {stats.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-balance text-text-inverse md:text-4xl">
            {stats.title}
          </h2>
        </header>

        <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {STATS_KEYS.map((key) => {
            const item = stats.items[key];
            return (
              <div key={key} className="text-center">
                <p className="font-display text-5xl font-medium leading-none text-secondary md:text-6xl">
                  {item.value}
                </p>
                <p className="mt-3 font-sans text-sm uppercase tracking-wider text-text-inverse/80 md:text-base">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
