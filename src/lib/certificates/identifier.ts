import crypto from "node:crypto";

// Deterministic-but-unique certificate number: BMS-<CODE>-<YYYYMMDD>-<short>.
// The short segment is derived from (userId+slug) so a re-issue yields the same number, while the
// DB unique constraint guarantees one record per (user, course).
export function certificateNumber(code: string, userId: string, slug: string, issuedAt: Date): string {
  const ymd = issuedAt.toISOString().slice(0, 10).replace(/-/g, "");
  const short = crypto.createHash("sha256").update(`${userId}:${slug}`).digest("hex").slice(0, 6).toUpperCase();
  const cleanCode = (code || "MC").replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return `BMS-${cleanCode}-${ymd}-${short}`;
}

// Public verification hash (also unique). Used by /certificates/verify/<hash>.
export function verificationHash(userId: string, slug: string, number: string): string {
  return crypto.createHash("sha256").update(`${userId}:${slug}:${number}`).digest("hex");
}
