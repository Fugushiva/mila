import {
  forwardRef,
  type Ref,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

/**
 * Custom-styled <select> with an inline chevron rendered as a sibling SVG
 * (rather than a CSS `background-image: url("data:...")`) so the icon color
 * follows the design tokens via `currentColor` and stays consistent in any
 * future light/dark/error theming. The wrapper is purely presentational
 * (`pointer-events: none`) so click/focus reach the underlying native
 * `<select>` exactly like before.
 */
export const Select = forwardRef(function Select(
  { children, className, error = false, ...rest }: SelectProps,
  ref: Ref<HTMLSelectElement>,
) {
  return (
    <span className={cn("relative block w-full", className)}>
      <select
        ref={ref}
        className={cn(
          "flex min-h-[48px] w-full appearance-none rounded-md border border-border bg-surface px-4 py-3 pr-10 font-sans text-base text-text transition-colors duration-200 focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50",
          error &&
            "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
});
