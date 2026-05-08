import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { LawyerCard } from "@/components/sections/LawyerCard";

type Props = { locale: Locale };

export function TeamGrid({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {TEAM_MEMBERS.map((m) => {
            const member = dict.team.members[m.key];
            const langs = m.languages.map((c) => dict.team.languages[c]);
            return (
              <div
                key={m.key}
                className={m.tone === "lead" ? "lg:col-span-2" : undefined}
              >
                <LawyerCard
                  variant="detailed"
                  initials={m.initials}
                  tone={m.tone}
                  name={member.name}
                  role={member.role}
                  shortBio={member.shortBio}
                  bio={member.bio}
                  credentials={
                    m.tone === "lead" ? dict.team.leadCredentials : undefined
                  }
                  languages={langs}
                  languagesLabel={dict.team.languagesLabel}
                  email={m.email}
                  emailLabel={dict.team.emailLabel}
                  linkedin={m.linkedin}
                  linkedinLabel={dict.team.linkedinLabel}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
