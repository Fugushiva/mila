import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";
import { EXPERTISES } from "@/lib/data/expertises";
import { ExpertiseCard } from "@/components/sections/ExpertiseCard";

type Props = { locale: Locale };

export function ExpertiseGrid({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.home.expertiseGrid.eyebrow}
          title={dict.home.expertiseGrid.title}
          intro={dict.home.expertiseGrid.intro}
          as="h2"
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTISES.map(({ key, icon }) => (
            <ExpertiseCard
              key={key}
              icon={icon}
              title={dict.home.expertiseGrid.items[key].title}
              description={dict.home.expertiseGrid.items[key].description}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            href={localizedPath(locale, "/expertises")}
            variant="secondary"
            size="md"
          >
            {dict.home.expertiseGrid.ctaAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
