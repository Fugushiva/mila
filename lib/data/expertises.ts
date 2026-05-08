import {
  Briefcase,
  Building2,
  FileText,
  Gavel,
  Globe2,
  Handshake,
  Lock,
  Plane,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * 12 expertises shown in the home `ExpertiseGrid` preview and on the
 * full Expertises page (PR #6).
 *
 * `key` matches `dict.home.expertiseGrid.items.<key>` (preview labels)
 * and `dict.expertises.items.<key>.{title, description, longDescription}`
 * (full page).
 * `icon` is a Lucide React component, used at strokeWidth=1.5 by convention.
 * `pillarId` groups expertises into the 4 pillars rendered on the
 * dedicated /expertises page (see `lib/data/pillars.ts`).
 */
export type ExpertiseKey =
  | "business"
  | "realEstate"
  | "immigration"
  | "tax"
  | "family"
  | "labor"
  | "ip"
  | "litigation"
  | "criminal"
  | "compliance"
  | "ma"
  | "wealth";

export type PillarId = "people" | "business" | "realestate" | "innovation";

export type Expertise = {
  key: ExpertiseKey;
  icon: LucideIcon;
  pillarId: PillarId;
};

export const EXPERTISES: readonly Expertise[] = [
  { key: "business", icon: Briefcase, pillarId: "business" },
  { key: "realEstate", icon: Building2, pillarId: "realestate" },
  { key: "immigration", icon: Plane, pillarId: "people" },
  { key: "tax", icon: Globe2, pillarId: "business" },
  { key: "family", icon: Users, pillarId: "people" },
  { key: "labor", icon: FileText, pillarId: "business" },
  { key: "ip", icon: Lock, pillarId: "innovation" },
  { key: "litigation", icon: Gavel, pillarId: "realestate" },
  { key: "criminal", icon: Scale, pillarId: "people" },
  { key: "compliance", icon: ShieldCheck, pillarId: "innovation" },
  { key: "ma", icon: Handshake, pillarId: "business" },
  { key: "wealth", icon: Sparkles, pillarId: "people" },
] as const;

/** Filter expertises by pillar — preserves declaration order. */
export function expertisesByPillar(pillarId: PillarId): readonly Expertise[] {
  return EXPERTISES.filter((e) => e.pillarId === pillarId);
}
