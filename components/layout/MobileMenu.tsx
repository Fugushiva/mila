"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Logo } from "@/components/common/Logo";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

type MobileMenuProps = {
  locale: Locale;
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  openLabel: string;
  closeLabel: string;
  /** Accessible label for the inner `<nav>` (localized). */
  navLabel: string;
  /** Visually-hidden title for the dialog (localized). */
  dialogTitle: string;
  languageSwitchLabel: string;
};

/**
 * Mobile drawer menu. Renders a burger button in the header on small
 * viewports; clicking opens a full-screen panel with the nav, language
 * switcher and primary CTA.
 *
 * a11y:
 *   - `role="dialog"` + `aria-modal="true"` on the panel
 *   - Focus moves to the close button on open
 *   - `Escape` closes the panel
 *   - Click outside (overlay) closes
 *   - Body scroll locked while open
 *
 * Animation respects `prefers-reduced-motion` via Tailwind's standard
 * `transition-*` classes (CSS layer in `globals.css` neutralizes them).
 */
export function MobileMenu({
  locale,
  navItems,
  ctaLabel,
  ctaHref,
  openLabel,
  closeLabel,
  navLabel,
  dialogTitle,
  languageSwitchLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const titleId = useId();

  // Lock background scroll while open + Escape closes + focus trap.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Capture the trigger element at effect-time so the cleanup callback
    // doesn't read a stale `ref.current` (React-hooks lint rule).
    const trigger = triggerRef.current;

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((el) => !el.hasAttribute("inert") && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel for keyboard users.
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to the trigger when the dialog closes.
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-md text-primary",
          "cursor-pointer transition-colors duration-200 hover:bg-primary/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          "lg:hidden",
        )}
      >
        <Menu aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
      </button>

      {/* Overlay + panel — kept in DOM so transitions animate; pointer-events
          gated by `open`. */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-bg shadow-xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <h2 id={titleId} className="sr-only">
          {dialogTitle}
        </h2>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <Logo locale={locale} size="sm" tone="navy" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label={closeLabel}
            className={cn(
              "inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-md text-primary",
              "cursor-pointer transition-colors duration-200 hover:bg-primary/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
            )}
          >
            <X aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label={navLabel}>
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-3 font-display text-2xl text-primary",
                    "cursor-pointer transition-colors duration-200 hover:bg-primary/5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t border-border px-6 py-6">
          <LanguageSwitcher
            locale={locale}
            ariaLabel={languageSwitchLabel}
            className="self-start"
          />
          <Button
            href={ctaHref}
            variant="primary"
            size="md"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </>
  );
}
