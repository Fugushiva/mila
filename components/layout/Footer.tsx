import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/common/Logo";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";

type FooterProps = {
  locale: Locale;
};

const PHONE_INTL = "+66971805845";
const EMAIL = "info@mila-law.com";

/**
 * 4-column footer on desktop, single-column stack on mobile.
 *
 * Columns:
 *   1. Brand + tagline
 *   2. Sitemap (nav links)
 *   3. Contact (address, tel, email, hours)
 *   4. Legal (mentions, privacy, cookies)
 *
 * Bottom bar: copyright (year is current). Phone uses `tel:+66...` with the
 * raw international format for native dialer support; the visible label uses
 * the formatted version from the dictionary.
 */
export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();
  const copyright = dict.footer.copyright.replace("{year}", String(year));

  const sitemap = [
    { href: localizedPath(locale, "/"), label: dict.nav.home },
    { href: localizedPath(locale, "/cabinet"), label: dict.nav.cabinet },
    { href: localizedPath(locale, "/equipe"), label: dict.nav.team },
    { href: localizedPath(locale, "/expertises"), label: dict.nav.expertises },
    { href: localizedPath(locale, "/contact"), label: dict.nav.contact },
  ];

  const legal = [
    {
      href: localizedPath(locale, "/mentions-legales"),
      label: dict.footer.legalNotice,
    },
    {
      href: localizedPath(locale, "/mentions-legales#privacy"),
      label: dict.footer.privacy,
    },
    {
      href: localizedPath(locale, "/mentions-legales#cookies"),
      label: dict.footer.cookies,
    },
  ];

  const linkClasses =
    "inline-flex items-start gap-2 rounded-sm font-sans text-sm text-text-muted cursor-pointer transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2";

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Logo locale={locale} size="sm" tone="navy" />
            <p className="font-sans text-sm leading-relaxed text-text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Column 2 — Sitemap */}
          <nav aria-label={dict.footer.navTitle} className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {dict.footer.navTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {dict.footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 font-sans text-sm leading-relaxed text-text-muted">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  strokeWidth={1.5}
                />
                <address className="not-italic">{dict.footer.address}</address>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_INTL}`}
                  className={linkClasses}
                  aria-label={`${dict.footer.contactTitle}: ${dict.footer.phone}`}
                >
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <span>{dict.footer.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={linkClasses}>
                  <Mail
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                    strokeWidth={1.5}
                  />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li className="font-sans text-sm leading-relaxed text-text-muted">
                {dict.footer.hours}
              </li>
            </ul>
          </div>

          {/* Column 4 — Legal */}
          <nav
            aria-label={dict.footer.legalTitle}
            className="flex flex-col gap-4"
          >
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {dict.footer.legalTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border py-6">
          <p className="font-sans text-xs text-text-muted">{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
