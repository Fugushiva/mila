import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType = "div"> = {
  /**
   * Override the rendered element. Defaults to `div`. Use `section`,
   * `header`, `footer`, etc. when the container is the section root.
   */
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

/**
 * Page-width container. Centers content with horizontal padding that scales
 * from mobile (24px) to desktop (32px). Max width 1280px (`max-w-7xl`).
 *
 * Per `docs/design-system/MASTER.md` — applied on every section root.
 */
export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
