// Interactive / external-activity units that the blocks+problem scrape could not represent as
// video/quiz (e.g. custom xblocks, LTI games, external simulators). Rendered as activity cards in
// the player, matching the live Open edX course. Keyed by course slug; `section` places the unit
// after that scraped section. URLs were captured from the live course blocks API — see
// docs/LEARNING_ACTIVITY_LINKS.md. Use `embedUrl` only when the source is truly embeddable
// (public iframe/video); otherwise `externalLaunchUrl` deep-links to the EXACT live activity.
export type InteractiveUnit = {
  section: string;
  title: string;
  activityType: "external-game" | "external-tool" | "video";
  launchLabel: string;
  status?: string;
  helperText?: string;
  embedUrl?: string; // public, embeddable source (iframe/youtube); when set the player embeds it
  externalLaunchUrl?: string; // exact live activity deep-link (NOT a course shell/home/catalogue)
};

// Serious Game block id captured from the live blocks API:
//   block-v1:Artemat+MC10_RES4CITY+2025_T01+type@serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a
// It is a custom `serious_game_xblock` (not a video/LTI we can read), rendered server-side and
// gated behind the learner's BoostMySkills session + X-Frame-Options, so it cannot be embedded
// locally. The jump_to URL below deep-links to the EXACT Serious Game activity in the live player
// (not the course home/catalogue). See docs/LEARNING_ACTIVITY_LINKS.md.
const SERIOUS_GAME_BLOCK =
  "block-v1:Artemat+MC10_RES4CITY+2025_T01+type@serious_game_xblock+block@842789e2ee504fd4b860ece9fc33154a";

export const interactiveUnits: Record<string, InteractiveUnit[]> = {
  "serious-game": [
    {
      section: "Serious Game",
      title: "Serious Game",
      activityType: "external-game",
      launchLabel: "Play",
      status: "Started",
      helperText: "This interactive game opens in the original BoostMySkills learning platform. Please refresh there to see your updated score.",
      externalLaunchUrl: `https://boostmyskills.eu/courses/course-v1:Artemat+MC10_RES4CITY+2025_T01/jump_to/${SERIOUS_GAME_BLOCK}`
    }
  ]
};

export const getInteractiveUnits = (slug: string): InteractiveUnit[] => interactiveUnits[slug] ?? [];
