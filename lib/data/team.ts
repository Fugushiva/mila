/**
 * Team members displayed on the home `TeamPreview` and the full Team page (PR #5).
 *
 * `key` matches `dict.home.teamPreview.members.<key>` in fr.json/en.json.
 * `initials` are rendered inside the SVG silhouette (LawyerSilhouette).
 * `tone` controls silhouette palette: `lead` for Pr. Stasi (deep navy),
 * `default` for the rest (softer navy).
 */
export type TeamMemberKey = "stasi" | "memberTwo" | "memberThree" | "memberFour";

export type TeamMember = {
  key: TeamMemberKey;
  initials: string;
  tone: "lead" | "default";
};

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { key: "stasi", initials: "AS", tone: "lead" },
  { key: "memberTwo", initials: "SL", tone: "default" },
  { key: "memberThree", initials: "MB", tone: "default" },
  { key: "memberFour", initials: "PW", tone: "default" },
] as const;

/** Lead lawyer rendered in the big horizontal card. */
export const LEAD_MEMBER: TeamMember = TEAM_MEMBERS[0];

/** Three secondary members rendered in the smaller cards row. */
export const SECONDARY_MEMBERS: readonly TeamMember[] = TEAM_MEMBERS.slice(1);
