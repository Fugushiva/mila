import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";

type FooterProps = {
  locale: Locale;
};

const PHONE_INTL = "+66971805845";
const EMAIL = "info@mila-law.com";

/**
 * Compact, premium footer.
 *
 * Design intent (post-redesign):
 *   - Far less wasted vertical space — pre-footer band collapsed into a
 *     dense single-row CTA strip (py-10 instead of py-16).
 *   - Editorial layout: oversized "MILA" wordmark on the left, four
 *     concise columns on the right, single hairline gold divider, tight
 *     copyright bar.
 *   - Animated gold ornament in the CTA band as the wow accent.
 *   - All link rows are gold-on-hover with a small chevron animation.
 *
 * Total height down ~40% vs the previous footer.
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

  // Gold-on-hover link with subtle chevron slide
  const linkClasses =
    "group/link inline-flex items-center gap-2 rounded-sm font-sans text-sm text-white/65 cursor-pointer transition-colors duration-200 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

  return (
    <footer className="mt-auto bg-primary text-text-inverse">
      {/* ── Compact CTA strip — animated gold ornament + magnetic CTA ─ */}
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Decorative gold disc */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-secondary/10 blur-3xl"
        />
        <Container>
          <div className="relative flex flex-col items-start gap-6 py-10 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="flex-1">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.35em] text-secondary">
                {dict.home.ctaBand.eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-2xl font-medium leading-tight text-text-inverse md:text-[2rem]">
                {dict.home.ctaBand.title}
              </h2>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={`tel:${PHONE_INTL}`}
                className="inline-flex items-center gap-2 font-sans text-sm font-bold tracking-wide text-secondary transition-opacity hover:opacity-80"
              >
                <Phone strokeWidth={1.5} size={16} aria-hidden />
                {dict.footer.phone}
              </a>
              <MagneticWrapper strength={0.2}>
                <Button
                  href={localizedPath(locale, "/contact")}
                  variant="primary"
                  size="md"
                  className="ring-1 ring-secondary/30 shadow-[0_10px_30px_-10px_rgba(200,169,106,0.5)] focus-visible:ring-offset-primary"
                >
                  {dict.nav.bookMeeting}
                </Button>
              </MagneticWrapper>
            </div>
          </div>
        </Container>
        <div className="pb-6">
          <GoldOrnament variant="compact" />
        </div>
      </div>

      {/* ── Main footer — editorial layout ──────────────────────────── */}
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-12 md:gap-8">
          {/* Brand — oversized editorial wordmark */}
          <div className="md:col-span-4">
            <Link
              href={`/${locale}`}
              aria-label={dict.nav.logoLabel}
              className="inline-block transition-opacity duration-200 hover:opacity-80"
            >
              <span className="block font-display text-4xl font-medium leading-none tracking-[0.04em] text-text-inverse md:text-5xl">
                MILA
              </span>
              <span className="mt-2 block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                International Legal Advice
              </span>
            </Link>
            <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-white/55">
              {dict.footer.tagline}
            </p>
            {/* Address & hours — moved here for compactness */}
            <ul className="mt-6 flex flex-col gap-2 font-sans text-xs leading-relaxed text-white/45">
              <li className="flex items-start gap-2">
                <MapPin
                  aria-hidden
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-secondary/70"
                  strokeWidth={1.5}
                />
                <address className="not-italic">{dict.footer.address}</address>
              </li>
              <li>{dict.footer.hours}</li>
            </ul>
          </div>

          {/* Sitemap */}
          <nav
            aria-label={dict.footer.navTitle}
            className="md:col-span-2 md:col-start-6 flex flex-col gap-3"
          >
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
              {dict.footer.navTitle}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasses}>
                    <span>{item.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      size={12}
                      strokeWidth={1.75}
                      className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact direct */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
              {dict.footer.contactTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`tel:${PHONE_INTL}`}
                  className={linkClasses}
                  aria-label={`${dict.footer.contactTitle}: ${dict.footer.phone}`}
                >
                  <Phone
                    aria-hidden
                    className="h-3.5 w-3.5 flex-shrink-0 text-secondary/70"
                    strokeWidth={1.5}
                  />
                  <span>{dict.footer.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className={linkClasses}>
                  <Mail
                    aria-hidden
                    className="h-3.5 w-3.5 flex-shrink-0 text-secondary/70"
                    strokeWidth={1.5}
                  />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/mila-law"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                  aria-label="LinkedIn MILA"
                >
                  <svg
                    aria-hidden
                    className="h-3.5 w-3.5 flex-shrink-0 text-secondary/70"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <nav
            aria-label={dict.footer.legalTitle}
            className="md:col-span-3 flex flex-col gap-3"
          >
            <h3 className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
              {dict.footer.legalTitle}
            </h3>
            <ul className="flex flex-col gap-1.5">
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

        {/* ── Copyright bar — minimal, single hairline ─────────────── */}
        <div className="flex flex-col gap-2 border-t border-secondary/15 py-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="font-sans text-[11px] tracking-wide text-white/30">
            {copyright}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/25">
            Bangkok · Hua Hin · Paris
          </p>
        </div>
      </Container>
    </footer>
  );
}
