import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mila-law.com";

const PAGES: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1.0 },
  { path: "/cabinet", changeFrequency: "yearly", priority: 0.8 },
  { path: "/equipe", changeFrequency: "yearly", priority: 0.8 },
  { path: "/expertises", changeFrequency: "yearly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.9 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap((page) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${page.path}`]),
        ),
      },
    })),
  );
}
