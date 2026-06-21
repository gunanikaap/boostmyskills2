// Open-redirect guard for the `next` / `returnTo` query parameter used across the auth flow.
//
// A `next` value travels untrusted from the browser into server redirects (auth/callback,
// auth/confirm) and client navigations (auth-form). `new URL(next, origin)` would happily resolve
// an absolute ("https://evil.com") or protocol-relative ("//evil.com") value to an EXTERNAL site,
// so we only ever allow same-origin, single-slash, absolute paths and fall back otherwise.
export function safeNextPath(next: string | null | undefined, fallback = "/dashboard"): string {
  if (typeof next !== "string") return fallback;
  // Must start with a single "/" (local path), and not "//" or "/\" (protocol-relative / backslash tricks).
  if (!/^\/(?![/\\])/.test(next)) return fallback;
  return next;
}
