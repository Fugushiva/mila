import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { MagneticWrapper } from "@/components/motion/MagneticWrapper";
import { getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/utils";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

export function CTABand({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-primary py-24 text-text-inverse md:py-32 mila-noise">
      {/* Two gold halos for depth — top-right and bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-secondary/[0.08] blur-3xl"
      />
      {/* Hairline gold corner brackets */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-secondary/40 md:left-10 md:top-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-secondary/40 md:bottom-10 md:right-10"
      />

      <Container className="relative">
        <div className="text-center">
          <MotionReveal>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-secondary">
              {dict.home.ctaBand.eyebrow}
            </p>
          </MotionReveal>
          <div className="mt-5 flex justify-center">
            <GoldOrnament variant="compact" />
          </div>
          <MotionReveal delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.05] tracking-tight text-balance text-text-inverse md:text-5xl lg:text-6xl">
              {dict.home.ctaBand.title}
            </h2>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-inverse/80">
              {dict.home.ctaBand.intro}
            </p>
          </MotionReveal>
          <MotionReveal delay={0.3} className="mt-12">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                href="tel:+66971805845"
                external
                variant="ghost-dark"
                size="lg"
              >
                {dict.footer.phone}
              </Button>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
