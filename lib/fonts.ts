import { EB_Garamond, Lato } from "next/font/google";

/**
 * Display font for headings — recommended for legal services by ui-ux-pro-max.
 * Self-hosted via next/font: zero external requests, zero CLS, RGPD-friendly.
 */
export const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  style: ["normal", "italic"],
});

/**
 * Body / UI font — warm institutional sans-serif.
 */
export const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  style: ["normal", "italic"],
});
