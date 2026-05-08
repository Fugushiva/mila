import "server-only";

import enDict from "@/dictionaries/en.json";
import frDict from "@/dictionaries/fr.json";
import type { Locale } from "./locales";

// Re-export the client-safe primitives so existing
// `import { LOCALES, isLocale, stripLocale, type Locale } from "@/lib/i18n"`
// keeps working from server contexts. Client components must import from
// `@/lib/locales` directly (this file is `server-only`).
export {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  stripLocale,
  type Locale,
} from "./locales";

/**
 * The French dictionary is the canonical source of truth for the shape.
 * Future locales must satisfy this same shape (compile-time enforcement).
 */
export type Dictionary = typeof frDict;

const dictionaries = {
  fr: frDict,
  en: enDict,
} as const satisfies Record<Locale, Dictionary>;

/**
 * Synchronous dictionary loader — dictionaries are statically imported and
 * tree-shaken per route. When a large locale comes online, switch to dynamic
 * imports.
 *
 * NOTE: This module is `server-only`. Client components needing copy must
 * receive it via props from a parent server component.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
