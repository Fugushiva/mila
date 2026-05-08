import {
  forwardRef,
  type CSSProperties,
  type Ref,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

const chevronStyle: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%231a1a1a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundPosition: "right 0.75rem center",
  backgroundSize: "1.25rem",
};

export const Select = forwardRef(function Select(
  { children, className, error = false, style, ...rest }: SelectProps,
  ref: Ref<HTMLSelectElement>,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "flex min-h-[48px] w-full appearance-none rounded-md border border-border bg-surface bg-right bg-no-repeat px-4 py-3 pr-10 font-sans text-base text-text transition-colors duration-200 focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
        className,
      )}
      style={{ ...chevronStyle, ...style }}
      {...rest}
    >
      {children}
    </select>
  );
});
