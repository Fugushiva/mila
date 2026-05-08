import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion/MotionReveal";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";
import { EXPERTISES } from "@/lib/data/expertises";
import { ExpertiseCard } from "@/components/sections/ExpertiseCard";

type Props = { locale: Locale };

export function ExpertiseGrid({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      {/* Subtle gold halo bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-secondary/[0.06] blur-3xl"
      />
      <Container className="relative">
        <MotionReveal>
          <SectionHeading
            eyebrow={dict.home.expertiseGrid.eyebrow}
            title={dict.home.expertiseGrid.title}
            intro={dict.home.expertiseGrid.intro}
            as="h2"
            align="center"
          />
        </MotionReveal>
        <div className="mt-6 flex justify-center">
          <GoldOrnament variant="compact" />
        </div>
        <MotionStagger
          stagger={0.07}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {EXPERTISES.map(({ key, icon }) => (
            <MotionStaggerItem key={key}>
              <ExpertiseCard
                icon={icon}
                title={dict.home.expertiseGrid.items[key].title}
                description={dict.home.expertiseGrid.items[key].description}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        <MotionReveal delay={0.1} className="mt-12 flex justify-center">
          <Button
            href={localizedPath(locale, "/expertises")}
            variant="secondary"
            size="md"
          >
            {dict.home.expertiseGrid.ctaAll}
          </Button>
        </MotionReveal>
      </Container>
    </section>
  );
}
