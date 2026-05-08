"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, stripLocale, type Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** Current active locale. */
  locale: Locale;
  /** Accessible group label (typically `dict.footer.languageSwitch`). */
  ariaLabel: string;
  className?: string;
};

/**
 * Compact FR / EN switch. Preserves the current path under the
 * other locale (e.g. `/fr/contact` -> `/en/contact`).
 *
 * Renders one link per locale, the active one styled as the current state.
 * Client component because we read the live pathname.
 */
export function LanguageSwitcher({
  locale,
  ariaLabel,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${locale}`;
  // Strip the active locale prefix to get the path-without-locale.
  const bare = stripLocale(pathname);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-border bg-surface/60 p-1 text-sm font-bold tracking-wide",
        className,
      )}
    >
      {LOCALES.map((l) => {
        const isActive = l === locale;
        const href = bare === "/" ? `/${l}` : `/${l}${bare}`;
        return (
          <Link
            key={l}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-sm px-2.5 uppercase",
              "cursor-pointer transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              isActive
                ? "bg-primary text-text-inverse"
                : "text-primary hover:bg-primary/5",
            )}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
