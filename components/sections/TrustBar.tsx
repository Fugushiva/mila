import { Container } from "@/components/ui/Container";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionReveal";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

const LOGO_KEYS = ["springer", "brill", "cengage", "mahidol"] as const;

export function TrustBar({ locale }: Props) {
  const dict = getDictionary(locale);
  const logos = dict.home.trustBar.logos;

  return (
    <section className="border-y border-border bg-bg py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <p className="text-center font-sans text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted">
            {dict.home.trustBar.label}
          </p>
          <GoldOrnament variant="compact" />
        </div>
        <MotionStagger
          stagger={0.12}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16"
        >
          {LOGO_KEYS.map((key) => (
            <MotionStaggerItem key={key}>
              <span className="block font-display text-2xl font-medium tracking-wide text-primary/75 transition-all duration-300 hover:text-primary hover:tracking-[0.04em] md:text-3xl">
                {logos[key]}
              </span>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
