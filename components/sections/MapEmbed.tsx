import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type MapEmbedProps = {
  locale: Locale;
};

export function MapEmbed({ locale }: MapEmbedProps) {
  const dict = getDictionary(locale);
  const { map } = dict.contact;

  return (
    <section className="bg-bg py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            {dict.contact.info.addressLabel}
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium text-primary md:text-3xl">
            {map.title}
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-text-muted">
            {map.intro}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.1!2d100.5847!3d13.7220!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSukhumvit%2063%20Bangkok!5e0!3m2!1sen!2sth!4v1700000000000"
            title={map.iframeTitle}
            className="block w-full"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  );
}
