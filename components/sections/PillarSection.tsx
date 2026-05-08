import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExpertiseCard } from "@/components/sections/ExpertiseCard";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { expertisesByPillar } from "@/lib/data/expertises";
import type { Pillar } from "@/lib/data/pillars";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  pillar: Pillar;
  /** When true, use cream background; alternates with surface for visual rhythm. */
  alternate?: boolean;
};

/**
 * One pillar section with its anchor, heading and grid of expertise cards.
 * Background alternates between `bg-bg` (cream) and `bg-surface` (white) via `alternate`.
 */
export function PillarSection({ locale, pillar, alternate = false }: Props) {
  const dict = getDictionary(locale);
  const expertises = expertisesByPillar(pillar.id);
  const pillarDict = dict.expertises.pillars[pillar.id];

  return (
    <section
      id={pillar.anchor}
      className={cn(
        "scroll-mt-32 py-16 md:py-24",
        alternate ? "bg-bg" : "bg-surface",
      )}
    >
      <Container>
        <SectionHeading
          eyebrow={pillarDict.title}
          title={pillarDict.title}
          intro={pillarDict.intro}
          as="h2"
          align="left"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertises.map(({ key, icon }) => (
            <ExpertiseCard
              key={key}
              icon={icon}
              title={dict.home.expertiseGrid.items[key].title}
              description={dict.expertises.items[key].longDescription}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
