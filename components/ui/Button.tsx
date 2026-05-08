import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Button variants — see `docs/design-system/MASTER.md` § Component Specs.
 *
 * - `primary`     : or rosé fill, primary CTA "Prendre RDV"
 * - `secondary`   : outline navy, secondary action
 * - `ghost-dark`  : transparent on navy bands (CTABand, Hero overlay)
 * - `ghost-light` : transparent on light bg (subtle in-section action)
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost-dark"
  | "ghost-light";
export type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  // Layout
  "inline-flex items-center justify-center gap-2 rounded-md font-sans " +
  "font-bold tracking-wide whitespace-nowrap " +
  // Interaction
  "cursor-pointer select-none " +
  "transition-colors duration-200 " +
  // a11y
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 " +
  // Disabled
  "disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-primary hover:bg-secondary-soft focus-visible:ring-offset-bg",
  secondary:
    "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-text-inverse focus-visible:ring-offset-bg",
  "ghost-dark":
    "border border-white/30 bg-transparent text-text-inverse hover:bg-white/10 focus-visible:ring-offset-primary",
  "ghost-light":
    "bg-transparent text-primary hover:bg-primary/5 focus-visible:ring-offset-bg",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[40px] px-4 py-2 text-sm",
  md: "min-h-[48px] px-6 py-3 text-base",
  lg: "min-h-[56px] px-8 py-4 text-lg",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type AsAnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    /**
     * When true, render as a regular `<a>` (target=_blank, mailto:, tel:)
     * instead of next/link. Default false.
     */
    external?: boolean;
  };

export type ButtonProps = AsButtonProps | AsAnchorProps;

function isAnchorProps(props: ButtonProps): props is AsAnchorProps {
  return typeof (props as AsAnchorProps).href === "string";
}

/**
 * Polymorphic Button. Renders `<button>` by default, or `<Link>` (or `<a>`
 * for `external`) when an `href` is provided.
 *
 * Style is controlled by `variant` + `size`. Cursor-pointer + focus ring
 * are baked in per design system contract.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (isAnchorProps(props)) {
    const { href, external, variant: _v, size: _s, className: _c, ...rest } =
      props;
    void _v;
    void _s;
    void _c;

    if (external) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          rel={rest.rel ?? "noopener noreferrer"}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, type, ...rest } = props;
  void _v;
  void _s;
  void _c;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});
