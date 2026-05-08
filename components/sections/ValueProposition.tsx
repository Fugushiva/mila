import {
  GraduationCap,
  Languages,
  MapPin,
  Scale,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoldOrnament } from "@/components/motion/GoldOrnament";
import {
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@/components/motion/MotionReveal";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import type { LucideIcon } from "lucide-react";

type Props = { locale: Locale };

const VALUE_PROP_KEYS = ["francophone", "academic", "trilingual", "local"] as const;
type ValuePropKey = (typeof VALUE_PROP_KEYS)[number];

const icons: Record<ValuePropKey, LucideIcon> = {
  francophone: Scale,
  academic: GraduationCap,
  trilingual: Languages,
  local: MapPin,
};

export function ValueProposition({ locale }: Props) {
  const dict = getDictionary(locale);

  return (
    <section className="bg-bg py-20 md:py-28">
      <Container>
        <MotionReveal>
          <SectionHeading
            title={dict.home.valueProp.title}
            as="h2"
            align="center"
          />
        </MotionReveal>
        <div className="mt-6 flex justify-center">
          <GoldOrnament variant="compact" />
        </div>
        <MotionStagger
          stagger={0.1}
          className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {VALUE_PROP_KEYS.map((key) => {
            const Icon = icons[key];
            const item = dict.home.valueProp.items[key];
            return (
              <MotionStaggerItem key={key} className="group text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-secondary ring-1 ring-secondary/20 transition-all duration-500 group-hover:bg-secondary group-hover:text-primary group-hover:shadow-[0_0_0_8px_rgba(200,169,106,0.12)]">
                  <Icon strokeWidth={1.5} size={28} aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}
