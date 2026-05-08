"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  /** Final number. */
  to: number;
  /** Starting number. Default 0. */
  from?: number;
  /** Animation duration in seconds. Default 1.6. */
  duration?: number;
  /** Suffix appended to the formatted number, e.g. "+", "ans". */
  suffix?: string;
  /** Locale-aware number formatting. Default `fr-FR`. */
  locale?: string;
  /** Optional className on the rendered span. */
  className?: string;
};

/**
 * Counter that animates from `from` to `to` once it enters the viewport.
 * Uses a spring-feel easeOut, locale-aware formatting, and respects
 * `prefers-reduced-motion` (instantly displays the final value).
 */
export function CounterUp({
  to,
  from = 0,
  duration = 1.6,
  suffix,
  locale = "fr-FR",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  const count = useMotionValue(from);
  const display = useTransform(count, (v) =>
    new Intl.NumberFormat(locale).format(Math.round(v)),
  );

  useEffect(() => {
    if (!isInView) return;
    if (reduced) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [isInView, to, duration, count, reduced]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix ? <span className="ml-0.5">{suffix}</span> : null}
    </span>
  );
}
