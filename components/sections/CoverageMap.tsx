import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type Props = { locale: Locale };

const INTERVENTION_KEYS = [
  "phuket",
  "pattaya",
  "chiangMai",
  "kohSamui",
] as const;

export function CoverageMap({ locale }: Props) {
  const dict = getDictionary(locale);
  const { coverage } = dict.cabinet;

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={coverage.eyebrow}
          title={coverage.title}
          intro={coverage.intro}
          as="h2"
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          {/* Left — inline SVG Thailand map */}
          <div className="relative mx-auto w-full max-w-md">
            <svg
              viewBox="0 0 320 480"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label={coverage.mapAlt}
              className="h-auto w-full drop-shadow-md"
            >
              <defs>
                <linearGradient
                  id="thFill"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="#0B1F3A"
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor="#0B1F3A"
                    stopOpacity="0.18"
                  />
                </linearGradient>
              </defs>
              {/* Stylized Thailand silhouette — simplified path */}
              <path
                d="M 160 30 C 175 35 188 50 192 70 C 196 92 188 110 196 130 C 206 152 220 168 218 188 C 216 210 200 222 200 248 C 200 270 214 285 214 308 C 214 330 200 348 188 358 C 178 368 178 380 184 396 C 190 412 200 426 196 442 C 192 456 178 462 168 458 C 160 454 156 444 158 432 C 160 418 156 406 148 396 C 138 386 130 376 132 360 C 134 344 142 332 138 318 C 132 302 118 294 116 274 C 114 252 124 240 122 220 C 120 200 108 188 110 168 C 112 148 124 136 124 116 C 124 96 116 84 122 66 C 128 50 144 38 160 30 Z"
                fill="url(#thFill)"
                stroke="#0B1F3A"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {/* Bangkok marker */}
              <g>
                <circle cx="156" cy="220" r="14" fill="#C8A96A" fillOpacity="0.25" />
                <circle cx="156" cy="220" r="7" fill="#C8A96A" />
                <circle cx="156" cy="220" r="3" fill="#0B1F3A" />
                <text
                  x="174"
                  y="225"
                  fontFamily="Lato, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B1F3A"
                >
                  {coverage.offices.bangkok.label}
                </text>
              </g>
              {/* Hua Hin marker */}
              <g>
                <circle cx="148" cy="282" r="10" fill="#C8A96A" fillOpacity="0.25" />
                <circle cx="148" cy="282" r="5" fill="#C8A96A" />
                <text
                  x="166"
                  y="287"
                  fontFamily="Lato, sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B1F3A"
                >
                  {coverage.offices.huaHin.label}
                </text>
              </g>
              {/* Intervention markers (Phuket, Pattaya, Chiang Mai, Koh Samui) */}
              <circle cx="120" cy="370" r="4" fill="#0B1F3A" fillOpacity="0.5" />
              <circle cx="172" cy="248" r="4" fill="#0B1F3A" fillOpacity="0.5" />
              <circle cx="142" cy="100" r="4" fill="#0B1F3A" fillOpacity="0.5" />
              <circle cx="158" cy="400" r="4" fill="#0B1F3A" fillOpacity="0.5" />
            </svg>
          </div>

          {/* Right — offices + interventions */}
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Bangkok office */}
              <article className="flex items-start gap-4 rounded-2xl border border-border bg-bg p-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                  <MapPin strokeWidth={1.5} size={20} aria-hidden />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {coverage.offices.bangkok.kind}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-medium text-primary">
                    {coverage.offices.bangkok.label}
                  </h3>
                </div>
              </article>

              {/* Hua Hin office */}
              <article className="flex items-start gap-4 rounded-2xl border border-border bg-bg p-5">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                  <MapPin strokeWidth={1.5} size={20} aria-hidden />
                </div>
                <div>
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {coverage.offices.huaHin.kind}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-medium text-primary">
                    {coverage.offices.huaHin.label}
                  </h3>
                </div>
              </article>
            </div>

            {/* Intervention cities */}
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                {coverage.interventionsLabel}
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {INTERVENTION_KEYS.map((k) => (
                  <li
                    key={k}
                    className="rounded-full border border-border bg-surface px-4 py-2 font-sans text-sm text-text-muted"
                  >
                    {coverage.interventions[k]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
