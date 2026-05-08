"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Hairline gold scroll-progress indicator pinned to the top of the viewport.
 *
 * Sits BELOW the sticky header (z-30 vs header's z-40) so it visually flows
 * through the brand. Uses a spring-smoothed scrollY → gives the bar a luxe,
 * physical feel instead of a literal 1:1 mapping.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[2px] origin-left bg-gradient-to-r from-secondary/60 via-secondary to-secondary-soft"
      style={{ scaleX }}
    />
  );
}
