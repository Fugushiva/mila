import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Long-form text wrapper. Constrains line length (~75ch), applies
 * EB Garamond to h2/h3, comfortable line-height, and harmonized
 * spacing between blocks. Used by mentions-legales, blog, etc.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl font-sans text-base leading-[1.75] text-text",
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-primary md:[&_h2]:text-3xl",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-primary md:[&_h3]:text-2xl",
        "[&>h2:first-child]:mt-0",
        "[&_p]:my-4 [&_p]:text-text",
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-secondary [&_a]:decoration-2 [&_a]:transition-colors [&_a]:hover:text-primary-soft",
        "[&_dl]:my-4 [&_dl]:grid [&_dl]:grid-cols-1 [&_dl]:gap-x-6 [&_dl]:gap-y-2 sm:[&_dl]:grid-cols-[max-content_1fr]",
        "[&_dt]:font-bold [&_dt]:text-primary",
        "[&_dd]:text-text-muted",
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1",
        className,
      )}
    >
      {children}
    </div>
  );
}
