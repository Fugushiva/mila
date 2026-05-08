import { renderOgImage, ogSize, ogContentType, ogAlt } from "@/lib/seo/og";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image(
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  return renderOgImage({
    lang,
    fromDict: (d) => ({
      eyebrow: d.expertises.hero.eyebrow,
      title: d.expertises.hero.h1,
    }),
  });
}
