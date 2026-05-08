import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Active locale — used to link to the localized home page. */
  locale: string;
  /** Optional accessible label override (defaults to "MILA — Home"). */
  ariaLabel?: string;
  /**
   * Size variant. `sm` for header, `md` for hero contexts.
   * @default 'sm'
   */
  size?: "sm" | "md";
  /**
   * Color scheme.
   * - `navy`  : navy wordmark + or rosé "INTERNATIONAL" subtitle (default, on light bg)
   * - `light` : white wordmark + or rosé "INTERNATIONAL" subtitle (on navy bands)
   */
  tone?: "navy" | "light";
  className?: string;
};

/**
 * MILA wordmark logo — pure inline SVG. No bitmap dependency, no CLS,
 * crisp at every density, sized via Tailwind.
 *
 * Pattern: "MILA" in EB Garamond style display + "INTERNATIONAL LEGAL ADVICE"
 * in Lato uppercase tracked, or rosé. Pure typographic mark — no symbol —
 * which is the editorial Magic Circle convention (see Bredin Prat, A&O).
 */
export function Logo({
  locale,
  ariaLabel,
  size = "sm",
  tone = "navy",
  className,
}: LogoProps) {
  // Wordmark uses `currentColor` and is driven by the wrapper's text color
  // class so it stays in sync with the design tokens (no hex hardcoded here).
  const wordmarkClass = tone === "light" ? "text-text-inverse" : "text-primary";

  const dimensions =
    size === "md"
      ? { width: 220, height: 60 }
      : { width: 160, height: 44 };

  return (
    <Link
      href={`/${locale}`}
      aria-label={ariaLabel ?? "MILA — Home"}
      className={cn(
        "inline-flex cursor-pointer items-center rounded-sm",
        wordmarkClass,
        "transition-opacity duration-200 hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
        className,
      )}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 220 60"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wordmark — inherits color from parent (text-primary / text-text-inverse) */}
        <text
          x="0"
          y="36"
          fontFamily="'EB Garamond', Georgia, 'Times New Roman', serif"
          fontSize="36"
          fontWeight="500"
          letterSpacing="2"
          fill="currentColor"
        >
          MILA
        </text>
        {/* Tagline — or rosé via design token */}
        <text
          x="0"
          y="54"
          fontFamily="'Lato', system-ui, sans-serif"
          fontSize="9"
          fontWeight="700"
          letterSpacing="2.5"
          fill="var(--color-secondary)"
        >
          INTERNATIONAL LEGAL ADVICE
        </text>
      </svg>
    </Link>
  );
}
