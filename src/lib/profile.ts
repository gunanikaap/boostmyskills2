// Resolve a human-readable name from a set of candidate fields, in priority order.
//
// The greeting (dashboard) and the certificate use DIFFERENT priorities — the dashboard prefers the
// chosen username, while the certificate prefers the learner's legal full name — so callers pass
// their own ordered candidates rather than baking one order in here. The first non-empty, trimmed
// candidate wins; "Learner" is the safe last resort.
export function getProfileDisplayName(...candidates: Array<string | null | undefined>): string {
  for (const candidate of candidates) {
    const trimmed = candidate?.trim();
    if (trimmed) return trimmed;
  }
  return "Learner";
}
