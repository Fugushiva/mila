import { Award } from "lucide-react";
import { LawyerSilhouette } from "@/components/common/LawyerSilhouette";

type Props = {
  initials: string;
  tone: "lead" | "default";
  name: string;
  role: string;
  shortBio: string;
  variant?: "lead" | "compact";
  credentials?: string;
};

export function LawyerCard({
  initials,
  tone,
  name,
  role,
  shortBio,
  variant = "compact",
  credentials,
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
