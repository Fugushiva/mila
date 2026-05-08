import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  accent: "navy" | "gold" | "emerald";
  title: string;
  publisher: string;
  year: string;
  description: string;
  variant?: "compact" | "horizontal";
  isbn?: string;
  isbnLabel?: string;
};

// Accent gradients reference design tokens — emerald uses the `accent` family
// added to globals.css (`--color-accent`, `--color-accent-soft`).
const accentClasses: Record<"navy" | "gold" | "emerald", string> = {
  navy: "bg-gradient-to-br from-primary via-primary-soft to-primary text-secondary",
  gold: "bg-gradient-to-br from-secondary via-secondary-soft to-secondary text-primary",
  emerald: "bg-gradient-to-br from-accent via-accent-soft to-accent text-secondary",
};

export function BookCard({
  accent,
  title,
  publisher,
  year,
  description,
  variant = "compact",
  isbn,
  isbnLabel,
}: Props) {
  if (variant === "horizontal") {
    return (
      <article className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm md:grid-cols-[200px_1fr] md:items-center md:gap-10 md:p-8 lg:grid-cols-[220px_1fr] lg:p-10">
        <div
          className={cn(
            "relative aspect-[3/4] overflow-hidden rounded-md shadow-lg",
            accentClasses[accent],
          )}
        >
          {/* Spine */}
          <div aria-hidden className="absolute inset-y-0 left-0 w-2 bg-black/20" />
          {/* Top band */}
          <div
            aria-hidden
            className="absolute left-6 right-6 top-6 h-px bg-current/40"
          />
          {/* Bottom band */}
          <div
            aria-hidden
            className="absolute bottom-6 left-6 right-6 h-px bg-current/40"
          />
          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <BookOpen strokeWidth={1.5} size={32} className="opacity-70" aria-hidden />
            <h3 className="mt-4 font-display text-base font-medium leading-tight">
              {title}
            </h3>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] opacity-80">
              {publisher} · {year}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            {publisher} · {year}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-primary md:text-3xl">
            {title}
          </h3>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-muted">
            {description}
          </p>
          {isbn && (
            <p className="mt-5 font-sans text-xs font-bold uppercase tracking-wider text-text-muted">
              {isbnLabel ?? "ISBN"}:{" "}
              <span className="font-normal text-text">{isbn}</span>
            </p>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6">
      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden rounded-md shadow-lg",
          accentClasses[accent],
        )}
      >
        {/* Spine */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-2 bg-black/20" />
        {/* Top band */}
        <div
          aria-hidden
          className="absolute left-6 right-6 top-6 h-px bg-current/40"
        />
        {/* Bottom band */}
        <div
          aria-hidden
          className="absolute bottom-6 left-6 right-6 h-px bg-current/40"
        />
        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <BookOpen strokeWidth={1.5} size={36} className="opacity-70" aria-hidden />
          <h3 className="mt-4 font-display text-xl font-medium leading-tight">
            {title}
          </h3>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] opacity-80">
            {publisher} · {year}
          </p>
        </div>
      </div>
      <p className="font-sans text-sm leading-relaxed text-text-muted">
        {description}
      </p>
    </article>
  );
}
