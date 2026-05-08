import {
  forwardRef,
  type InputHTMLAttributes,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const Checkbox = forwardRef(function Checkbox(
  { className, ...rest }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer rounded border-2 border-border-strong bg-surface text-primary accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});
