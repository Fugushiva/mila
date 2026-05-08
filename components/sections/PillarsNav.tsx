import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { PILLARS } from "@/lib/data/pillars";

type Props = { locale: Locale };

/**
 * Sticky in-page navigation between the 4 pillar sections.
 * Pure server component — relies on native `#anchor` scrolling.
 * Smooth scroll is enabled globally via the `scroll-smooth` class on
 * `<html>` / `<body>` (set in `app/[lang]/layout.tsx`).
 */
export function PillarsNav({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <nav
      aria-label={dict.expertises.navLabel}
      className="sticky top-20 z-30 border-y border-border bg-bg/80 backdrop-blur-md"
    >
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-2 py-3 md:gap-4 md:py-4">
          {PILLARS.map(({ id, anchor, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${anchor}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-sans text-sm font-bold text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                <Icon
                  strokeWidth={1.5}
                  size={16}
                  aria-hidden
                  className="text-secondary transition-colors duration-200 group-hover:text-secondary"
                />
                <span>{dict.expertises.pillars[id].title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
