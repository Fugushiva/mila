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
 * `key` matches `dict.home.expertiseGrid.items.<key>` in fr.json/en.json.
 * `icon` is a Lucide React component, used at strokeWidth=1.5 by convention.
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

export type Expertise = {
  key: ExpertiseKey;
  icon: LucideIcon;
};

export const EXPERTISES: readonly Expertise[] = [
  { key: "business", icon: Briefcase },
  { key: "realEstate", icon: Building2 },
  { key: "immigration", icon: Plane },
  { key: "tax", icon: Globe2 },
  { key: "family", icon: Users },
  { key: "labor", icon: FileText },
  { key: "ip", icon: Lock },
  { key: "litigation", icon: Gavel },
  { key: "criminal", icon: Scale },
  { key: "compliance", icon: ShieldCheck },
  { key: "ma", icon: Handshake },
  { key: "wealth", icon: Sparkles },
] as const;
