import type { LucideIcon } from "lucide-react";
import { SheenCard } from "@/components/motion/SheenCard";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * Server component. Renders the icon as JSX **inside** a `SheenCard` client
 * shell — JSX children serialize fine across the server→client boundary
 * whereas a raw `LucideIcon` function does not.
 *
 * Hover behavior comes from `SheenCard`: cursor-tracking gold radial glow,
 * gold hairline ring fade-in, and a -2px Y lift. The icon flips from
 * navy → gold and rotates 3deg via `group-hover/sheen` selectors.
 */
export function ExpertiseCard({ icon: Icon, title, description }: Props) {
  return (
    <SheenCard
      className="border border-border bg-surface hover:shadow-[0_20px_50px_-15px_rgba(11,31,58,0.18)]"
      innerClassName="flex h-full flex-col gap-3 p-6"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/5 text-primary transition-all duration-500 group-hover/sheen:bg-primary group-hover/sheen:text-secondary group-hover/sheen:rotate-3">
        <Icon strokeWidth={1.5} size={22} aria-hidden />
      </div>
      <h3 className="font-display text-lg font-medium text-primary">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-text-muted">
        {description}
      </p>
    </SheenCard>
  );
}
