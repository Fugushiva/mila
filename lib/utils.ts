/**
 * Class-name joiner. Lightweight stand-in for clsx/tailwind-merge during
 * PR #1. We can swap in `clsx` + `tailwind-merge` in PR #2 when the UI
 * primitives ship if we hit class-conflict cases.
 */
export function cn(
  ...inputs: Array<string | number | boolean | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Build a path under the active locale.
 * Examples:
 *   localizedPath('fr', '/contact') -> '/fr/contact'
 *   localizedPath('en', '/')        -> '/en'
 */
export function localizedPath(locale: string, path: string): string {
  if (path === "/" || path === "") return `/${locale}`;
  return `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
}
