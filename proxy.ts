import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/locales";

/**
 * Locale-routing proxy (Next.js 16 successor to middleware).
 *
 * - If the path already starts with a supported locale (`/fr`, `/en`), pass through.
 * - Otherwise, negotiate via `Accept-Language` and rewrite to `/<locale>/<path>`.
 *
 * Static assets, Next internals and OG images bypass via the matcher below.
 */

function pickLocaleFromHeader(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;
  // Cheap parser — order tags by quality factor and pick the first supported.
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";q=");
      const q = qPart ? Number.parseFloat(qPart) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if ((LOCALES as readonly string[]).includes(base)) {
      return base as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already localized — let it pass.
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = pickLocaleFromHeader(request.headers.get("accept-language"));
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run for everything except: Next internals, API routes, og images, robots,
  // sitemap, manifest, public assets with a file extension, and favicons.
  matcher: [
    "/((?!_next|api|opengraph-image|twitter-image|icon|apple-icon|favicon|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\..*).*)",
  ],
};
