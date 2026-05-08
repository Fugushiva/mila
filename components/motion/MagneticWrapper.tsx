"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the cursor (0–1). Default 0.25. */
  strength?: number;
};

/**
 * Magnetic-cursor effect. Wraps a CTA so it gently follows the cursor when
 * hovered — premium tactile feedback. Disabled under `prefers-reduced-motion`.
 *
 * IMPORTANT: child must be a single element that accepts a className/style
 * pass-through. We render a `motion.span` wrapper so the consumer can pass
 * any button/link inside without breaking layout.
 */
export function MagneticWrapper({
  children,
  className,
  strength = 0.25,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: xs, y: ys }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}
