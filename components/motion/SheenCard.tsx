"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Tailwind class describing the underlying card surface. */
  innerClassName?: string;
};

/**
 * Wraps content in a shell that:
 *  - tracks the cursor position via CSS custom properties
 *  - renders a soft gold radial glow following the cursor on hover
 *  - lifts subtly via `transform: translateY(-2px)` (no scale → no layout shift)
 *
 * The inner element keeps your existing card styling. The shell is purely
 * decorative — no semantic role.
 */
export function SheenCard({ children, className, innerClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--sheen-x", `${px}%`);
    ref.current.style.setProperty("--sheen-y", `${py}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group/sheen relative overflow-hidden rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-0.5",
        className,
      )}
      style={{
        // initial values — center
        ["--sheen-x" as string]: "50%",
        ["--sheen-y" as string]: "50%",
      }}
    >
      {/* inner content */}
      <div className={cn("relative z-10", innerClassName)}>{children}</div>

      {/* sheen — a radial gold glow that follows the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/sheen:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--sheen-x) var(--sheen-y), rgba(200,169,106,0.18), transparent 60%)",
        }}
      />

      {/* hairline gold border that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl ring-1 ring-secondary/0 transition-all duration-300 group-hover/sheen:ring-secondary/40"
      />
    </div>
  );
}
