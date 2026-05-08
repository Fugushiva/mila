import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name joiner with Tailwind conflict resolution.
 * Standard pattern used across shadcn/ui, vercel/next-learn etc.
 *
 * Example:
 *   cn('px-2 py-1', 'px-4', isActive && 'bg-primary')
 *   // -> 'py-1 px-4 bg-primary'   (px-2 wins-out by px-4 via twMerge)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
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
