"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Center diamond size. Default 6 (px equiv via Tailwind h-1.5 w-1.5). */
  variant?: "default" | "compact";
};

/**
 * Editorial gold divider — two horizontal hairlines flanking a small gold
 * diamond. The classic Magic Circle / luxury-house ornament. Animates the
 * lines drawing outward from the center on first reveal.
 */
export function GoldOrnament({ className, variant = "default" }: Props) {
  const reduced = useReducedMotion();
  const lineWidth = variant === "compact" ? "w-12" : "w-20 md:w-24";

  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <motion.span
        className={cn(
          "h-px origin-right bg-gradient-to-l from-secondary to-transparent",
          lineWidth,
        )}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      />
      <motion.span
        className="h-1.5 w-1.5 rotate-45 bg-secondary"
        initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      />
      <motion.span
        className={cn(
          "h-px origin-left bg-gradient-to-r from-secondary to-transparent",
          lineWidth,
        )}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      />
    </div>
  );
}
