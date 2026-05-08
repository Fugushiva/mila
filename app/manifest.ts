import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MILA International Legal Advice",
    short_name: "MILA Law",
    description:
      "French- and Italian-speaking law firm in Bangkok and Hua Hin.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#0B1F3A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
