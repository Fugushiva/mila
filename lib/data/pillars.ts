import {
  Building2,
  Sparkles,
  UserRound,
  Building,
  type LucideIcon,
} from "lucide-react";
import type { PillarId } from "@/lib/data/expertises";

/**
 * Four pillars used to group the 12 expertises on the dedicated
 * /[lang]/expertises page (PR #6).
 *
 * `id` matches `Expertise.pillarId` and `dict.expertises.pillars.<id>.*`.
 * `anchor` is the URL fragment used by the in-page `PillarsNav`.
 */
export type Pillar = {
  id: PillarId;
  anchor: string;
  icon: LucideIcon;
};

export const PILLARS: readonly Pillar[] = [
  { id: "people", anchor: "personnes-famille", icon: UserRound },
  { id: "business", anchor: "entreprises", icon: Building2 },
  { id: "realestate", anchor: "immobilier", icon: Building },
  { id: "innovation", anchor: "innovation", icon: Sparkles },
] as const;
