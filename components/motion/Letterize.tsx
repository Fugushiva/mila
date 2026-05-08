"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType } from "react";

type Props = {
  text: string;
  /** Render-as element. Default `span`. Use `h1`, `h2` for semantic headers. */
  as?: ElementType;
  className?: string;
  /** Per-word stagger delay (seconds). */
  stagger?: number;
  /** Initial delay before the cascade starts. */
  delay?: number;
};

/**
 * Cinematic word-by-word reveal. Splits a string on whitespace and animates
 * each word with a vertical curtain rise (translateY + opacity).
 *
 * Word-level (not letter-level) is intentional — letter-level is gimmicky
 * and harms readability for long phrases. Word-level is editorial.
 *
 * Each word is wrapped in a span with `overflow:hidden` and the inner span
 * slides up from below — the classic "magazine pull-quote" reveal.
 */
export function Letterize({
  text,
  as,
  className,
  stagger = 0.06,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  const Component = (as ?? "span") as ElementType;
  const MotionComponent = motion(Component);

  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0 }
        : { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVariants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { y: "110%" },
        visible: {
          y: "0%",
          transition: {
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
      };

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={wordVariants}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
