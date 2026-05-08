"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Halo size in px. Default 600. */
  size?: number;
  /** Halo color. Default gold rgba string. */
  color?: string;
};

/**
 * Mouse-tracking gold halo for hero sections. Listens to the parent
 * `section.relative` rectangle and renders a soft radial gradient that
 * follows the cursor with spring smoothing.
 *
 * Disabled under `prefers-reduced-motion` — falls back to a static
 * centered glow.
 */
export function MouseHalo({
  className,
  size = 600,
  color = "rgba(200,169,106,0.18)",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 80, damping: 28, mass: 0.6 });
  const ys = useSpring(y, { stiffness: 80, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    const el = wrapperRef.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    // initial center
    const rect = parent.getBoundingClientRect();
    x.set(rect.width / 2 - size / 2);
    y.set(rect.height / 2 - size / 2);

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left - size / 2);
      y.set(e.clientY - r.top - size / 2);
    };
    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, [reduced, size, x, y]);

  return (
    <motion.div
      ref={wrapperRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute z-0 rounded-full blur-3xl",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
        x: reduced ? "calc(50% - 300px)" : xs,
        y: reduced ? "calc(50% - 300px)" : ys,
      }}
    />
  );
}
