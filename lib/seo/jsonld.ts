import "server-only";
import type { Locale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

const COMMON_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "3rd Floor, Modern Town Building, Soi Sukhumvit 63 (Ekkamai), Klongton Nua, Watthana",
  addressLocality: "Bangkok",
  postalCode: "10110",
  addressCountry: "TH",
} as const;

const COMMON_GEO = {
  "@type": "GeoCoordinates",
  latitude: 13.722,
  longitude: 100.585,
} as const;

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "MILA International Legal Advice",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/icon.svg`,
    email: "info@mila-law.com",
    telephone: "+66971805845",
    address: COMMON_ADDRESS,
    sameAs: [] as string[],
  };
}

export function legalServiceJsonLd(
  locale: Locale,
  params: { name: string; description: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#legalservice`,
    name: params.name,
    description: params.description,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/icon.svg`,
    address: COMMON_ADDRESS,
    geo: COMMON_GEO,
    telephone: "+66971805845",
    email: "info@mila-law.com",
    priceRange: "$$$",
    areaServed: ["Thailand", "France", "Italy", "European Union"],
    availableLanguage: ["French", "English", "Italian", "Thai"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

type PersonInput = {
  name: string;
  jobTitle: string;
  email: string;
  url?: string;
  knowsLanguage: ReadonlyArray<string>;
};

export function personJsonLd(person: PersonInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    email: person.email,
    url: person.url,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsLanguage: [...person.knowsLanguage],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbListJsonLd(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}/${locale}${c.path === "/" ? "" : c.path}`,
    })),
  };
}
