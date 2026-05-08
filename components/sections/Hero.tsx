import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import { MouseHalo } from "@/components/motion/MouseHalo";
import { Letterize } from "@/components/motion/Letterize";
import { CounterUp } from "@/components/motion/CounterUp";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { ChevronDown } from "lucide-react";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

const STAT_KEYS = ["years", "languages", "cities", "publications"] as const;

/**
 * Editorial typographic hero — replaces the previous Bangkok-skyline photo
 * pattern with a Magic Circle / Cravath-style brandable lockup:
 *
 *   - Deep navy band with subtle film-grain noise
 *   - Mouse-tracking gold halo (luxe, not gimmicky)
 *   - Vertical "MILA" gold watermark on the right edge
 *   - Eyebrow + animated gold ornament + oversized display H1
 *   - The country name ("Thaïlande" / "Thailand") rendered in animated gold
 *     gradient text (mila-text-shimmer) — the focal accent
 *   - Word-by-word reveal on H1
 *   - Animated stat ticker (12+ years · 3 languages · 2 offices · 4+ books)
 *   - Magnetic primary CTA + restrained ghost CTA
 *   - Custom scroll hint at the bottom
 */
export function Hero({ locale }: Props) {
  const dict = getDictionary(locale);
  const hero = dict.home.hero;

  // Split H1 into "before {emphasis}" + emphasis + "after" for selective styling.
  // Falls back gracefully if h1Emphasis is not present in h1.
  const emphasisIdx = hero.h1.toLowerCase().indexOf(hero.h1Emphasis.toLowerCase());
  const before = emphasisIdx >= 0 ? hero.h1.slice(0, emphasisIdx).trimEnd() : hero.h1;
  const after =
    emphasisIdx >= 0
      ? hero.h1.slice(emphasisIdx + hero.h1Emphasis.length).trimStart()
      : "";
  const emphasis = emphasisIdx >= 0 ? hero.h1.slice(emphasisIdx, emphasisIdx + hero.h1Emphasis.length) : "";

  return (
    <section className="relative isolate overflow-hidden bg-primary text-text-inverse mila-noise">
      {/* Layered gradient base — navy → primary-soft for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-soft"
      />

      {/* Mouse-tracking gold halo (client component) */}
      <MouseHalo size={680} />

      {/* Static decorative gold disc — bottom-left, low opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl"
      />

      {/* Hairline gold corner brackets — editorial frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-secondary/40 md:left-10 md:top-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 h-12 w-12 border-r border-t border-secondary/40 md:right-10 md:top-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 border-b border-l border-secondary/40 md:bottom-10 md:left-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-secondary/40 md:bottom-10 md:right-10"
      />

      {/* Vertical wordmark — premium spine accent on the right edge (lg+) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 mila-vertical-mark font-sans text-[10px] font-bold uppercase text-secondary/40 lg:inline-block xl:right-6 xl:text-xs"
      >
        EST · 2012 · BANGKOK
      </span>

      <div className="relative flex min-h-[88vh] items-center py-28 md:py-36">
        <Container className="relative z-10">
          {/* Eyebrow + ornament */}
          <MotionReveal y={12} delay={0.05}>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.45em] text-secondary md:text-xs">
              {hero.eyebrow}
            </p>
          </MotionReveal>

          <div className="mt-5 mb-8 max-w-fit">
            <GoldOrnament variant="compact" className="justify-start" />
          </div>

          {/* H1 — word-stagger reveal */}
          <h1 className="max-w-5xl font-display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.02em] text-balance text-text-inverse md:text-7xl lg:text-[5.5rem]">
            <Letterize as="span" text={before} className="block" />
            {emphasis ? (
              <>
                <span className="block">
                  <Letterize
                    as="span"
                    text={emphasis}
                    delay={0.5}
                    className="mila-text-shimmer italic"
                  />
                </span>
                {after ? (
                  <Letterize as="span" text={after} delay={0.9} className="block" />
                ) : null}
              </>
            ) : null}
          </h1>

          {/* Subtitle */}
          <MotionReveal y={20} delay={1.1} className="mt-8">
            <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/80 md:text-xl">
              {hero.subtitle}
            </p>
          </MotionReveal>

          {/* CTAs — primary is magnetic, secondary is ghost */}
          <MotionReveal y={20} delay={1.25} className="mt-12">
            <div className="flex flex-col gap-4 sm:flex-row">
              <MagneticWrapper strength={0.22}>
                <Button
                  href={localizedPath(locale, "/contact")}
                  variant="primary"
                  size="lg"
                  className="ring-1 ring-secondary/30 shadow-[0_10px_40px_-10px_rgba(200,169,106,0.6)]"
                >
                  {dict.common.ctaBookMeeting}
                </Button>
              </MagneticWrapper>
              <Button
                href={localizedPath(locale, "/expertises")}
                variant="ghost-dark"
                size="lg"
              >
                {dict.common.ctaDiscoverExpertise}
              </Button>
            </div>
          </MotionReveal>

          {/* Stats ticker — animated counters */}
          <MotionReveal y={20} delay={1.4} className="mt-20">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 border-t border-secondary/20 pt-10 md:grid-cols-4">
              {STAT_KEYS.map((key) => {
                const stat = hero.stats[key];
                return (
                  <div key={key} className="flex flex-col">
                    <dt className="order-2 mt-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-text-inverse/60">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-display text-3xl font-medium leading-none text-secondary md:text-5xl">
                      <CounterUp
                        to={stat.value}
                        suffix={stat.suffix}
                        locale={locale === "fr" ? "fr-FR" : "en-US"}
                      />
                    </dd>
                  </div>
                );
              })}
            </dl>
          </MotionReveal>
        </Container>
      </div>

      {/* Scroll hint */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <MotionReveal delay={1.7} y={0} className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-text-inverse/50">
            {hero.scrollHint}
          </span>
          <ChevronDown
            aria-hidden
            strokeWidth={1.5}
            size={18}
            className="animate-bounce text-secondary"
          />
        </MotionReveal>
      </div>

      {/* Bottom fade-out to bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  );
}
