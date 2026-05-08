import "server-only";

import frDict from "@/dictionaries/fr.json";

/**
 * Supported locales for MILA Law.
 *
 * Phase 1 (this MVP): French only — the primary market is francophone
 * expatriates and French SME directors. The infrastructure is intentionally
 * left open for Phase 2 to add English and Italian without refactoring.
 *
 * Phase 2 plan:
 *   - English: `dictionaries/en.json` already exists with full parity, just
 *     re-import it here and add `"en"` to `LOCALES`.
 *   - Italian: requires creating `dictionaries/it.json`. The existing
 *     `/studio` Wix page provides source content.
 *
 * The `lang` segment is the canonical route param everywhere.
 */
export const LOCALES = ["fr"] as const;
export const DEFAULT_LOCALE = "fr" as const;

export type Locale = (typeof LOCALES)[number];

/**
 * The French dictionary is the canonical source of truth for the shape.
 * Future locales must satisfy this same shape (compile-time enforcement).
 */
export type Dictionary = typeof frDict;

const dictionaries = {
  fr: frDict,
} as const satisfies Record<Locale, Dictionary>;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Synchronous dictionary loader — dictionaries are statically imported and
 * tree-shaken per route. When a large locale comes online, switch to dynamic
 * imports.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
