import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeaderScrollWrapper } from "@/components/layout/HeaderScrollWrapper";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/common/Logo";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
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
    <>
      {/* ── Top bar — gold accent signature, cabinet info ─────────── */}
      <div className="relative w-full overflow-hidden bg-primary px-4 py-2 md:px-6">
        {/* Soft gold halo on the right edge — premium signature */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/2 h-32 w-72 -translate-y-1/2 bg-secondary/10 blur-2xl"
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="hidden font-sans text-[11px] tracking-[0.18em] uppercase text-white/80 md:block">
            Bangkok&nbsp;&nbsp;·&nbsp;&nbsp;Hua Hin&nbsp;&nbsp;·&nbsp;&nbsp;Lun–Ven 9h–18h
          </p>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-secondary/40 to-transparent md:block" />
          <a
            href={`tel:+66971805845`}
            className="font-sans text-[11px] font-bold tracking-[0.18em] uppercase text-secondary transition-opacity duration-200 hover:opacity-80"
          >
            +66&nbsp;(0)97&nbsp;180&nbsp;5845
          </a>
        </div>
      </div>

      <header
        className="sticky top-0 z-40 w-full px-4 md:px-6"
      >
      <div className="mx-auto w-full max-w-7xl">
        <HeaderScrollWrapper className="flex items-center justify-between gap-4">
          <Logo locale={locale} size="sm" tone="navy" ariaLabel={dict.nav.logoLabel} />

          <nav
            aria-label={dict.nav.primaryNavLabel}
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                  className="relative rounded-md px-3 py-2 font-sans text-sm font-bold text-primary cursor-pointer no-underline transition-colors duration-200 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-secondary after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
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
            <MagneticWrapper strength={0.18} className="hidden lg:inline-block">
              <Button
                href={ctaHref}
                variant="primary"
                size="sm"
                className="ring-1 ring-secondary/30 shadow-[0_8px_24px_-8px_rgba(200,169,106,0.5)]"
              >
                {dict.nav.bookMeeting}
              </Button>
            </MagneticWrapper>
            <MobileMenu
              locale={locale}
              navItems={navItems}
              ctaLabel={dict.nav.bookMeeting}
              ctaHref={ctaHref}
              openLabel={dict.nav.openMenu}
              closeLabel={dict.nav.closeMenu}
              navLabel={dict.nav.mobileNavLabel}
              dialogTitle={dict.nav.mobileDialogTitle}
              languageSwitchLabel={dict.footer.languageSwitch}
            />
          </div>
          </HeaderScrollWrapper>
      </div>
      </header>
    </>
  );
}
