import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/common/Logo";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
};

/**
 * Sticky floating header. Top-4 with backdrop-blur — anti-pattern of
 * "edge-to-edge top-0" called out by `docs/design-system/MASTER.md`.
 *
 * Layout:
 *   [Logo]  ......  [Nav (lg+)]  [Lang switch]  [CTA Book]   [Burger (lt-lg)]
 *
 * Server component: nav data comes from the dictionary, no client state.
 * The interactive bits (LanguageSwitcher, MobileMenu) are explicit
 * `"use client"` islands.
 */
export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);

  const navItems = [
    { href: localizedPath(locale, "/cabinet"), label: dict.nav.cabinet },
    { href: localizedPath(locale, "/equipe"), label: dict.nav.team },
    { href: localizedPath(locale, "/expertises"), label: dict.nav.expertises },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];
  const ctaHref = localizedPath(locale, "/contact");

  return (
    <header
      className="sticky top-0 z-40 w-full"
      // No background here — that goes on the inner pill so we get the
      // floating-island look. The sticky wrapper is invisible.
    >
      <Container className="pt-4">
        <div
          className="flex items-center justify-between gap-4 rounded-xl border border-border bg-bg/80 px-4 py-2 shadow-sm backdrop-blur-md md:px-6"
        >
          <Logo locale={locale} size="sm" tone="navy" />

          <nav
            aria-label="Primary"
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 font-sans text-sm font-bold text-primary cursor-pointer transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              locale={locale}
              ariaLabel={dict.footer.languageSwitch}
              className="hidden md:inline-flex"
            />
            <Button
              href={ctaHref}
              variant="primary"
              size="sm"
              className="hidden lg:inline-flex"
            >
              {dict.nav.bookMeeting}
            </Button>
            <MobileMenu
              locale={locale}
              navItems={navItems}
              ctaLabel={dict.nav.bookMeeting}
              ctaHref={ctaHref}
              openLabel={dict.nav.openMenu}
              closeLabel={dict.nav.closeMenu}
              languageSwitchLabel={dict.footer.languageSwitch}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
