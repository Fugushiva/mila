import {
  GraduationCap,
  Languages,
  MapPin,
  Scale,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <SectionHeading
          title={dict.home.valueProp.title}
          as="h2"
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROP_KEYS.map((key) => {
            const Icon = icons[key];
            const item = dict.home.valueProp.items[key];
            return (
              <div key={key} className="text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
                  <Icon strokeWidth={1.5} size={28} aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
