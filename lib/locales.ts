/**
 * Locale primitives — safe for **client and server** components, middleware,
 * and route handlers. Keep this file free of any `server-only` import.
 *
 * The actual dictionaries (potentially large + server-only filesystem reads
 * later) live behind `getDictionary` in `./i18n.ts`, which marks itself
 * `server-only` and re-exports the types from this file.
 */

export const LOCALES = ["fr", "en"] as const;
export const DEFAULT_LOCALE = "fr" as const;

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Strip the locale segment from a pathname.
 * Examples:
 *   stripLocale('/fr/contact') -> '/contact'
 *   stripLocale('/en')         -> '/'
 *   stripLocale('/contact')    -> '/contact'  (no locale prefix)
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname;
}
