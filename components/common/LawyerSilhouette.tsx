import { cn } from "@/lib/utils";

type Props = {
  initials: string;
  tone?: "lead" | "default";
  size?: number;
  className?: string;
};

const PALETTES = {
  lead: {
    bg: "#0B1F3A",
    accent: "#C8A96A",
  },
  default: {
    bg: "#1A3556",
    accent: "#D4B97E",
  },
} as const;

export function LawyerSilhouette({
  initials,
  tone = "default",
  size = 200,
  className,
}: Props) {
  const { bg: bgColor, accent } = PALETTES[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("block", className)}
    >
      {/* Background tile */}
      <rect x="0" y="0" width="200" height="200" rx="20" ry="20" fill={bgColor} />
      {/* Head circle */}
      <circle cx="100" cy="70" r="32" fill="#FAFAF7" fillOpacity="0.12" />
      {/* Shoulders trapezoid */}
      <path d="M30 200 L60 130 L140 130 L170 200 Z" fill={accent} fillOpacity="0.18" />
      {/* Suit collar V */}
      <path d="M85 130 L100 155 L115 130 Z" fill={accent} fillOpacity="0.4" />
      {/* Tie / lapel bar */}
      <rect x="97" y="155" width="6" height="40" rx="2" fill={accent} />
      {/* Initials */}
      <text
        x="180"
        y="186"
        textAnchor="end"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="500"
        fill="#FAFAF7"
        fillOpacity="0.85"
      >
        {initials}
      </text>
    </svg>
  );
}
