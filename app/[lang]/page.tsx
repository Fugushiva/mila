import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";

export async function generateMetadata(
  props: PageProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.home.title };
}

/**
 * PR #1 placeholder home. The full sectioned home ships in PR #3.
 *
 * Goal here: prove the foundations work end-to-end —
 *  - Locale routing (/fr) resolves
 *  - Dictionaries load
 *  - EB Garamond + Lato render correctly
 *  - Design tokens are applied via Tailwind v4 @theme (utility classes only —
 *    no inline `var(--...)` wrappers; that pattern is banned by MASTER.md).
 */
export default async function LocaleHome(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
          MILA — Foundation milestone
        </p>
        <h1 className="font-display text-4xl text-primary md:text-5xl">
          {dict.meta.tagline}
        </h1>
        <p className="mt-6 font-sans text-lg leading-relaxed text-text-muted">
          {dict.meta.description}
        </p>
        <p className="mt-12 text-sm text-text-muted">
          Active locale:{" "}
          <strong className="text-primary">{lang}</strong>
        </p>
      </div>
    </div>
  );
}
