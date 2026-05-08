import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase Lato label above the heading (or rosé color). */
  eyebrow?: string;
  /** Main heading text. Renders as the configured `as` element. */
  title: ReactNode;
  /** Optional intro paragraph rendered in muted text below the heading. */
  intro?: ReactNode;
  /** Heading level — `h2` (default) for section headings, `h1` for page hero. */
  as?: "h1" | "h2" | "h3";
  /** Center alignment by default. Set to `"left"` for left-aligned sections. */
  align?: "center" | "left";
  className?: string;
};

/**
 * Reusable heading block: eyebrow (Lato uppercase or rosé) + heading
 * (EB Garamond, weight 500, balanced) + optional intro paragraph.
 *
 * Matches the editorial Magic-Circle pattern from `docs/audit/02-refonte-strategy.md`.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as = "h2",
  align = "center",
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;
  const isCentered = align === "center";

  const headingSize =
    as === "h1"
      ? "text-4xl md:text-5xl lg:text-display"
      : "text-3xl md:text-4xl";

  return (
    <header
      className={cn(
        "max-w-3xl",
        isCentered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag
        className={cn(
          "font-display font-medium tracking-tight text-primary",
          headingSize,
        )}
      >
        {title}
      </HeadingTag>
      {intro ? (
        <p
          className={cn(
            "mt-6 font-sans text-lg leading-relaxed text-text-muted",
            isCentered ? "mx-auto" : undefined,
          )}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
