import {
  forwardRef,
  type Ref,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef(function Textarea(
  { className, error = false, ...rest }: TextareaProps,
  ref: Ref<HTMLTextAreaElement>,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[160px] w-full resize-y rounded-md border border-border bg-surface px-4 py-3 font-sans text-base leading-relaxed text-text placeholder:text-text-muted/60 transition-colors duration-200 focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50",
        error &&
          "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600",
        className,
      )}
      {...rest}
    />
  );
});
