import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/common/Prose";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { getDictionary, isLocale } from "@/lib/i18n";
import { LOCALES } from "@/lib/locales";
import { JsonLd } from "@/lib/seo/JsonLdScript";
import { breadcrumbListJsonLd } from "@/lib/seo/jsonld";

type MentionsLegalesPageProps = {
  params: Promise<{ lang: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

const TOC_LINK_CLASS =
  "text-primary underline underline-offset-2 decoration-secondary decoration-2 transition-colors hover:text-primary-soft";

export async function generateMetadata(
  props: MentionsLegalesPageProps,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: dict.legal.metaTitle,
    description: dict.legal.metaDescription,
    alternates: {
      canonical: `/${lang}/mentions-legales`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `/${l}/mentions-legales`]),
      ),
    },
    openGraph: {
      title: `${dict.legal.metaTitle} | ${dict.meta.siteName}`,
      description: dict.legal.metaDescription,
      url: `${SITE_URL}/${lang}/mentions-legales`,
      type: "website",
    },
    robots: { index: false, follow: true },
  };
}

export default async function MentionsLegalesPage(
  props: MentionsLegalesPageProps,
) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { legal } = dict;
  const { sections } = legal;

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd(lang, [
          { name: dict.nav.home, path: "/" },
          { name: dict.legal.title, path: "/mentions-legales" },
        ])}
      />
      <PageHero
        eyebrow={legal.hero.eyebrow}
        title={legal.hero.h1}
        subtitle={legal.hero.subtitle}
      />

      <section className="bg-bg py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <p className="font-sans text-sm italic text-text-muted">
              {legal.lastUpdated}
            </p>

            <nav
              aria-label={legal.toc.title}
              className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-8"
            >
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-secondary">
                {legal.toc.title}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-6 font-sans text-base text-text">
                <li>
                  <Link href="#editor" className={TOC_LINK_CLASS}>
                    {legal.toc.items.editor}
                  </Link>
                </li>
                <li>
                  <Link href="#hosting" className={TOC_LINK_CLASS}>
                    {legal.toc.items.hosting}
                  </Link>
                </li>
                <li>
                  <Link href="#intellectual-property" className={TOC_LINK_CLASS}>
                    {legal.toc.items.intellectualProperty}
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className={TOC_LINK_CLASS}>
                    {legal.toc.items.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="#cookies" className={TOC_LINK_CLASS}>
                    {legal.toc.items.cookies}
                  </Link>
                </li>
                <li>
                  <Link href="#law" className={TOC_LINK_CLASS}>
                    {legal.toc.items.law}
                  </Link>
                </li>
              </ol>
            </nav>

            <article className="mt-12">
              <Prose>
                <h2 id="editor">{sections.editor.title}</h2>
                <dl>
                  <dt>{sections.editor.items.name.label}</dt>
                  <dd>{sections.editor.items.name.value}</dd>
                  <dt>{sections.editor.items.address.label}</dt>
                  <dd>{sections.editor.items.address.value}</dd>
                  <dt>{sections.editor.items.phone.label}</dt>
                  <dd>
                    <a href="tel:+66971805845">{sections.editor.items.phone.value}</a>
                  </dd>
                  <dt>{sections.editor.items.email.label}</dt>
                  <dd>
                    <a href="mailto:info@mila-law.com">
                      {sections.editor.items.email.value}
                    </a>
                  </dd>
                  <dt>{sections.editor.items.representative.label}</dt>
                  <dd>{sections.editor.items.representative.value}</dd>
                  <dt>{sections.editor.items.registration.label}</dt>
                  <dd>{sections.editor.items.registration.value}</dd>
                </dl>

                <h2 id="hosting">{sections.hosting.title}</h2>
                <p>{sections.hosting.intro}</p>
                <p>
                  <strong>{sections.hosting.host.name}</strong>
                  <br />
                  {sections.hosting.host.address}
                  <br />
                  <a
                    href={sections.hosting.host.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sections.hosting.host.url}
                  </a>
                </p>

                <h2 id="intellectual-property">
                  {sections.intellectualProperty.title}
                </h2>
                <p>{sections.intellectualProperty.paragraphs.p1}</p>
                <p>{sections.intellectualProperty.paragraphs.p2}</p>

                <h2 id="privacy">{sections.privacy.title}</h2>
                <h3>{sections.privacy.paragraphs.controller.title}</h3>
                <p>{sections.privacy.paragraphs.controller.text}</p>
                <h3>{sections.privacy.paragraphs.purposes.title}</h3>
                <p>{sections.privacy.paragraphs.purposes.text}</p>
                <h3>{sections.privacy.paragraphs.legalBasis.title}</h3>
                <p>{sections.privacy.paragraphs.legalBasis.text}</p>
                <h3>{sections.privacy.paragraphs.retention.title}</h3>
                <p>{sections.privacy.paragraphs.retention.text}</p>
                <h3>{sections.privacy.paragraphs.rights.title}</h3>
                <p>{sections.privacy.paragraphs.rights.text}</p>

                <h2 id="cookies">{sections.cookies.title}</h2>
                <p>{sections.cookies.paragraphs.p1}</p>
                <p>{sections.cookies.paragraphs.p2}</p>
                <p>{sections.cookies.paragraphs.p3}</p>

                <h2 id="law">{sections.law.title}</h2>
                <p>{sections.law.paragraphs.p1}</p>
                <p>{sections.law.paragraphs.p2}</p>
              </Prose>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
