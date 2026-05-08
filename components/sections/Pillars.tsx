import { Clock, Globe, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

const PILLAR_KEYS = ["excellence", "multicultural", "availability"] as const;
type PillarKey = (typeof PILLAR_KEYS)[number];

const icons: Record<PillarKey, LucideIcon> = {
  excellence: GraduationCap,
  multicultural: Globe,
  availability: Clock,
};

export function Pillars({ locale }: Props) {
  const dict = getDictionary(locale);
  const { values } = dict.cabinet;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={values.eyebrow}
          title={values.title}
          intro={values.intro}
          as="h2"
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {PILLAR_KEYS.map((key) => {
            const Icon = icons[key];
            const item = values.items[key];
            return (
              <article key={key} className="text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-secondary shadow-md">
                  <Icon strokeWidth={1.5} size={32} aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-primary">
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-base leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
