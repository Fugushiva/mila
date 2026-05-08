/**
 * Team members displayed on the home `TeamPreview` and the full Team page (PR #5).
 *
 * `key` matches `dict.team.members.<key>` in fr.json/en.json.
 * `initials` are rendered inside the SVG silhouette (LawyerSilhouette).
 * `tone` controls silhouette palette: `lead` for Pr. Stasi (deep navy),
 * `default` for the rest (softer navy).
 * `languages` are ISO-ish locale codes resolved against `dict.team.languages.<code>`
 * for accessible labels in the active locale.
 * `email` / `linkedin` are dereferenced as `mailto:` / external links;
 * `linkedin` is a placeholder hash today and will be wired to real profiles later.
 */
export type TeamMemberKey =
  | "stasi"
  | "wichai"
  | "atitaya"
  | "amrita"
  | "pasakorn"
  | "nai";

export type LanguageCode = "fr" | "en" | "it" | "th";

export type TeamMember = {
  key: TeamMemberKey;
  initials: string;
  tone: "lead" | "default";
  languages: readonly LanguageCode[];
  email: string;
  linkedin: string;
};

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    key: "stasi",
    initials: "AS",
    tone: "lead",
    languages: ["fr", "en", "it"],
    email: "stasi@mila-law.com",
    linkedin: "#",
  },
  {
    key: "wichai",
    initials: "WJ",
    tone: "default",
    languages: ["en", "th"],
    email: "wichai@mila-law.com",
    linkedin: "#",
  },
  {
    key: "atitaya",
    initials: "AT",
    tone: "default",
    languages: ["en", "th"],
    email: "atitaya@mila-law.com",
    linkedin: "#",
  },
  {
    key: "amrita",
    initials: "AL",
    tone: "default",
    languages: ["en", "th"],
    email: "amrita@mila-law.com",
    linkedin: "#",
  },
  {
    key: "pasakorn",
    initials: "PN",
    tone: "default",
    languages: ["en", "th"],
    email: "pasakorn@mila-law.com",
    linkedin: "#",
  },
  {
    key: "nai",
    initials: "NK",
    tone: "default",
    languages: ["en", "th"],
    email: "nai@mila-law.com",
    linkedin: "#",
  },
] as const;

/** Lead lawyer rendered in the big horizontal card. */
export const LEAD_MEMBER: TeamMember = TEAM_MEMBERS[0];

/** Three secondary members rendered in the smaller cards row of the home preview. */
export const SECONDARY_MEMBERS: readonly TeamMember[] = TEAM_MEMBERS.slice(1, 4);
