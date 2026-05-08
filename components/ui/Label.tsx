import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export function Label({ children, className, required, ...rest }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-2 block font-sans text-sm font-bold text-primary",
        className,
      )}
      {...rest}
    >
      {children}
      {required ? (
        <span className="ml-0.5 text-red-600" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
