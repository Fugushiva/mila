import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { ebGaramond, lato } from "@/lib/fonts";
import { getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import "../globals.css";

/**
 * Localized **root** layout. There is no `app/layout.tsx`; the root HTML
 * document lives here so `<html lang>` can be set dynamically per locale.
 * The `proxy.ts` at the project root redirects `/` to the negotiated locale.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

const OG_LOCALE: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  it: "it_IT",
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  const dict = getDictionary(lang);
  const isMultiLocale = LOCALES.length > 1;

  return {
    title: {
      default: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${lang}`,
      // Only emit `hreflang` alternates when more than one locale is shipped.
      // For Phase 1 (FR-only) this stays empty; Phase 2 will populate it
      // automatically once `LOCALES` includes `en` / `it`.
      languages: isMultiLocale
        ? Object.fromEntries(LOCALES.map((l) => [l, `/${l}`]))
        : undefined,
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[lang] ?? "fr_FR",
      siteName: dict.meta.siteName,
      title: `${dict.meta.siteName} — ${dict.meta.tagline}`,
      description: dict.meta.description,
      url: `${SITE_URL}/${lang}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F3A" },
  ],
};

export default async function LocaleLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${ebGaramond.variable} ${lato.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-text-inverse focus:shadow-lg"
        >
          {dict.common.skipToContent}
        </a>
        <main id="main" className="flex min-h-screen flex-col">
          {props.children}
        </main>
      </body>
    </html>
  );
}
