import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ExpertiseCard({ icon: Icon, title, description }: Props) {
  return (
    <article className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/5 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-secondary">
        <Icon strokeWidth={1.5} size={22} aria-hidden />
      </div>
      <h3 className="font-display text-lg font-medium text-primary">{title}</h3>
      <p className="font-sans text-sm leading-relaxed text-text-muted">
        {description}
      </p>
    </article>
  );
}
