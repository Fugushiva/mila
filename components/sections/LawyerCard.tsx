import { Award, Mail, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { LawyerSilhouette } from "@/components/common/LawyerSilhouette";

type Props = {
  initials: string;
  tone: "lead" | "default";
  name: string;
  role: string;
  shortBio: string;
  variant?: "lead" | "compact" | "detailed";
  credentials?: string;
  // Only consumed when variant === "detailed":
  bio?: string;
  languages?: readonly string[];
  languagesLabel?: string;
  email?: string;
  emailLabel?: string;
  linkedin?: string;
  linkedinLabel?: string;
};

export function LawyerCard({
  initials,
  tone,
  name,
  role,
  shortBio,
  variant = "compact",
  credentials,
  bio,
  languages,
  languagesLabel,
  email,
  emailLabel,
  linkedin,
  linkedinLabel,
}: Props) {
  if (variant === "lead") {
    return (
      <article className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-surface p-8 shadow-md md:grid-cols-[260px_1fr] md:p-10">
        <div className="flex justify-center md:justify-start">
          <LawyerSilhouette initials={initials} tone={tone} size={260} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            {role}
          </p>
          <h3 className="mt-3 font-display text-2xl font-medium text-primary md:text-3xl">
            {name}
          </h3>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-muted">
            {shortBio}
          </p>
          {credentials ? (
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Award strokeWidth={1.5} size={14} aria-hidden />
              {credentials}
            </span>
          ) : null}
        </div>
      </article>
    );
  }

  if (variant === "detailed") {
    return (
      <article
        className={cn(
          "grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md md:grid-cols-[180px_1fr] md:gap-8 md:p-8",
          tone === "lead" &&
            "border-secondary/40 shadow-md md:grid-cols-[220px_1fr] lg:p-10",
        )}
      >
        <div className="flex justify-center md:justify-start">
          <LawyerSilhouette
            initials={initials}
            tone={tone}
            size={tone === "lead" ? 220 : 180}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            {role}
          </p>
          <h3
            className={cn(
              "mt-3 font-display font-medium text-primary",
              tone === "lead" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
            )}
          >
            {name}
          </h3>
          {credentials && (
            <span className="mt-3 inline-flex items-center gap-2 self-start rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Award strokeWidth={1.5} size={14} aria-hidden />
              {credentials}
            </span>
          )}
          {bio && (
            <p className="mt-5 font-sans text-base leading-relaxed text-text-muted">
              {bio}
            </p>
          )}
          {languages && languages.length > 0 && (
            <div className="mt-5">
              {languagesLabel && (
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-text-muted">
                  {languagesLabel}
                </p>
              )}
              <ul className="mt-2 flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <li
                    key={lang}
                    className="inline-flex items-center rounded-full border border-border bg-bg px-3 py-1 font-sans text-xs font-bold tracking-wide text-primary"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {(email || linkedin) && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label={emailLabel}
                  className="inline-flex items-center gap-2 font-sans text-sm font-bold text-primary underline-offset-4 transition-colors hover:text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                  <Mail strokeWidth={1.5} size={16} aria-hidden />
                  {email}
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  aria-label={linkedinLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-bold text-primary underline-offset-4 transition-colors hover:text-secondary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                >
                  <ExternalLink strokeWidth={1.5} size={16} aria-hidden />
                  LinkedIn
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md">
      <LawyerSilhouette initials={initials} tone={tone} size={120} />
      <div>
        <h3 className="font-display text-lg font-medium text-primary">{name}</h3>
        <p className="mt-1 text-sm font-bold text-secondary">{role}</p>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">{shortBio}</p>
      </div>
    </article>
  );
}
