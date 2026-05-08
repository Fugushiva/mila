import {
  forwardRef,
  type InputHTMLAttributes,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = forwardRef(function Input(
  { className, error = false, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex min-h-[48px] w-full rounded-md border border-border bg-surface px-4 py-3 font-sans text-base text-text placeholder:text-text-muted/60 transition-colors duration-200 focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
        className,
      )}
      {...rest}
    />
  );
});
