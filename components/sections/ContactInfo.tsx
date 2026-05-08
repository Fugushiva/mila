import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type ContactInfoProps = {
  locale: Locale;
};

const valueLinkClasses =
  "mt-1 inline-flex rounded-sm font-sans text-base text-text transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

export function ContactInfo({ locale }: ContactInfoProps) {
  const dict = getDictionary(locale);
  const { info, map } = dict.contact;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-md md:p-10">
      <div>
        <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
          {info.eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl font-medium text-primary md:text-3xl">
          {info.title}
        </h2>
      </div>

      <ul className="mt-8 space-y-5">
        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <MapPin size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.addressLabel}
            </p>
            <address className="mt-1 font-sans text-base leading-relaxed not-italic text-text">
              {map.intro}
            </address>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <Phone size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.phoneLabel}
            </p>
            <a href="tel:+66971805845" className={valueLinkClasses}>
              {info.phoneValue}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <Mail size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.emailLabel}
            </p>
            <a href="mailto:info@mila-law.com" className={valueLinkClasses}>
              {info.emailValue}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <MessageCircle size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.whatsappLabel}
            </p>
            <a
              href="https://wa.me/66971805845"
              target="_blank"
              rel="noopener noreferrer"
              className={valueLinkClasses}
            >
              {info.whatsappValue}
            </a>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <MessageSquare size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.lineLabel}
            </p>
            <p className="mt-1 font-sans text-base text-text">{info.lineValue}</p>
          </div>
        </li>

        <li className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-secondary">
            <Clock size={20} strokeWidth={1.5} aria-hidden />
          </div>
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              {info.hoursLabel}
            </p>
            <p className="mt-1 font-sans text-base leading-relaxed text-text">
              {info.hoursValue}
            </p>
          </div>
        </li>
      </ul>

      <div className="mt-8 border-t border-border pt-6">
        <Button
          href="https://cal.com/mila-law"
          target="_blank"
          external
          variant="primary"
          size="md"
          className="w-full"
        >
          {info.bookOnline}
        </Button>
      </div>
    </div>
  );
}
