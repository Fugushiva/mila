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
import { LEAD_MEMBER, SECONDARY_MEMBERS } from "@/lib/data/team";
import { LawyerCard } from "@/components/sections/LawyerCard";

type Props = { locale: Locale };

export function TeamPreview({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-bg py-20 md:py-28">
      <Container>
        <MotionReveal>
          <SectionHeading
            eyebrow={dict.home.teamPreview.eyebrow}
            title={dict.home.teamPreview.title}
            intro={dict.home.teamPreview.intro}
            as="h2"
            align="center"
          />
        </MotionReveal>
        <div className="mt-6 flex justify-center">
          <GoldOrnament variant="compact" />
        </div>
        <MotionReveal delay={0.1} className="mt-14">
          <LawyerCard
            variant="lead"
            initials={LEAD_MEMBER.initials}
            tone={LEAD_MEMBER.tone}
            name={dict.team.members.stasi.name}
            role={dict.team.members.stasi.role}
            shortBio={dict.team.leadBio}
            credentials={dict.team.leadCredentials}
          />
        </MotionReveal>
        <MotionStagger
          stagger={0.1}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SECONDARY_MEMBERS.map((member) => (
            <MotionStaggerItem key={member.key}>
              <LawyerCard
                variant="compact"
                initials={member.initials}
                tone={member.tone}
                name={dict.team.members[member.key].name}
                role={dict.team.members[member.key].role}
                shortBio={dict.team.members[member.key].shortBio}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        <MotionReveal delay={0.1} className="mt-12 flex justify-center">
          <Button
            href={localizedPath(locale, "/equipe")}
            variant="secondary"
            size="md"
          >
            {dict.home.teamPreview.ctaAll}
          </Button>
        </MotionReveal>
      </Container>
    </section>
  );
}
