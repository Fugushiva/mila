"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";

type Props = {
  children: ReactNode;
  /** Delay in seconds before the element animates in. */
  delay?: number;
  /** Distance traveled (px) along the y-axis. Default 24. */
  y?: number;
  /** Override default `as` element. */
  as?: ElementType;
  className?: string;
  /** When true, animates only once (default). */
  once?: boolean;
  /** Margin used by IntersectionObserver to trigger reveal earlier. */
  amount?: "some" | "all" | number;
};

/**
 * Reveal-on-scroll wrapper. Fades + slides up when 30% visible.
 * Respects `prefers-reduced-motion` — falls back to instant fade.
 *
 * Editorial-grade easing curve (Apple HIG-inspired) and 700ms duration
 * for that "expensive" cinematic feel. Avoids the cheap 200ms snap that
 * plagues most landing pages.
 */
export function MotionReveal({
  children,
  delay = 0,
  y = 24,
  as,
  className,
  once = true,
  amount = 0.3,
}: Props) {
  const reduced = useReducedMotion();
  const Component = (as ?? "div") as ElementType;
  const MotionComponent = motion(Component);

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
}

type StaggerProps = {
  children: ReactNode;
  stagger?: number;
  className?: string;
  amount?: "some" | "all" | number;
};

/**
 * Container that staggers reveals of `MotionStaggerItem` children.
 * Uses `whileInView` so the cascade fires when the group enters view.
 */
export function MotionStagger({
  children,
  stagger = 0.08,
  className,
  amount = 0.2,
}: StaggerProps) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0 }
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  y?: number;
  className?: string;
  as?: ElementType;
};

export function MotionStaggerItem({
  children,
  y = 20,
  className,
  as,
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const Component = (as ?? "div") as ElementType;
  const MotionComponent = motion(Component);

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <MotionComponent className={className} variants={variants}>
      {children}
    </MotionComponent>
  );
}
