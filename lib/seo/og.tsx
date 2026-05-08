import { ImageResponse } from "next/og";
import { getDictionary, isLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "MILA International Legal Advice";

type RenderArgs = {
  lang: string;
  fromDict: (dict: Dictionary) => {
    eyebrow?: string;
    title: string;
  };
};

export async function renderOgImage({ lang, fromDict }: RenderArgs) {
  if (!isLocale(lang)) {
    return new ImageResponse(<div />, ogSize);
  }
  const dict = getDictionary(lang);
  const { eyebrow, title } = fromDict(dict);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, #0B1F3A 0%, #1A3556 50%, #0B1F3A 100%)",
          color: "#FAFAF7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#C8A96A",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "2px solid #C8A96A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C8A96A",
              fontFamily: "Georgia, serif",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            M
          </div>
          <span>MILA International Legal Advice</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#C8A96A",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#FAFAF7",
              fontWeight: 500,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(250, 250, 247, 0.75)",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            Bangkok · Hua Hin · Thailand
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
