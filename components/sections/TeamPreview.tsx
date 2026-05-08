import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";
import { LEAD_MEMBER, SECONDARY_MEMBERS } from "@/lib/data/team";
import { LawyerCard } from "@/components/sections/LawyerCard";

type Props = { locale: Locale };

export function TeamPreview({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={dict.home.teamPreview.eyebrow}
          title={dict.home.teamPreview.title}
          intro={dict.home.teamPreview.intro}
          as="h2"
          align="center"
        />
        <div className="mt-14">
          <LawyerCard
            variant="lead"
            initials={LEAD_MEMBER.initials}
            tone={LEAD_MEMBER.tone}
            name={dict.home.teamPreview.members.stasi.name}
            role={dict.home.teamPreview.members.stasi.role}
            shortBio={dict.home.teamPreview.leadBio}
            credentials={dict.home.teamPreview.leadCredentials}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECONDARY_MEMBERS.map((member) => (
            <LawyerCard
              key={member.key}
              variant="compact"
              initials={member.initials}
              tone={member.tone}
              name={dict.home.teamPreview.members[member.key].name}
              role={dict.home.teamPreview.members[member.key].role}
              shortBio={dict.home.teamPreview.members[member.key].shortBio}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            href={localizedPath(locale, "/equipe")}
            variant="secondary"
            size="md"
          >
            {dict.home.teamPreview.ctaAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
