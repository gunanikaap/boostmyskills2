# Certificate — Live Audit

Inspected the live BoostMySkills learner platform with an authenticated session (credentials only
from gitignored `.env.local`, never committed/printed). Script: `scripts/inspect-cert.mjs`
(output gitignored).

## Live routes inspected

| Probe | Result |
| --- | --- |
| `GET /api/certificates/v0/certificates/<username>/` (Open edX Certificates API) | **200 → `[]`** — the test account has **no earned certificates** |
| `apps.boostmyskills.eu/dashboard` certificate links | none (no completed course → nothing to render) |

Because the account has not completed a course, **no issued certificate could be rendered for
pixel inspection.** BoostMySkills runs **Open edX** (confirmed throughout this project: authn MFE,
blocks/problem APIs, `serious_game_xblock`). Open edX issues a **"Certificate of Achievement"** as a
**web certificate (HTML page)** at `/certificates/<uuid>`, downloadable/printable to PDF, with a
public verification URL. We replicate that standard structure with BoostMySkills + EU-project
branding (the platform is funded under the RES4CITY / SHERLOCK Horizon Europe projects).

## Fields replicated (standard Open edX "Certificate of Achievement")

| Field | Source | On our certificate |
| --- | --- | --- |
| Platform logo | `public/logos/boostmyskills-logo.png` | top-left |
| Title | standard | **"Certificate of Achievement"** |
| Statement | standard | "This is to certify that" |
| Learner full name | `profiles.full_name` / user metadata | centred, large |
| Course / micro-credential title | `courses-catalogue` | "has successfully completed **<title>**" |
| Course code + project | `courses-catalogue` (`code`, `project`) | sub-line |
| Provider / organisation | `courses-catalogue.org` | "issued by <org> on BoostMySkills" |
| Issued date | `certificates.issued_at` | "Issued on <DD Month YYYY>" |
| Certificate number | generated `BMS-<CODE>-<YYYYMMDD>-<short>` | footer |
| Verification hash + URL | generated (sha-256 hex) | footer + `/certificates/verify/<hash>` |
| Certificate type | `micro-credential` (course) | label |
| EU funding line | standard for these projects | "Co-funded by the European Union." |

## Styling notes

- **A4 landscape** PDF (Open edX certificates are landscape).
- Brand green **`#079845`** (from the site) for rules/headings; dark slate text `#0a2a33`.
- Decorative border, centred composition, generous spacing — matching the formal Open edX layout.
- Generated with **pdf-lib** server-side (deterministic, no headless browser needed).

## Eligibility behaviour (replicated)

Open edX issues a certificate when the learner **passes** the course (meets the grading policy).
We implement an explicit, documented policy (see `docs/CERTIFICATE_RULES.md`):

- **MCQ courses:** all videos complete **AND** every MCQ attempted **AND** MCQ score ≥ 50%.
- **Video-only courses:** all videos complete.
- **Content-only courses** (15 RESSKILL courses whose blocks API 500s — reading/outline only):
  all content units marked complete.

## Format

- **PDF**, generated on demand at **`GET /api/certificates/<courseSlug>`** (server-side, pdf-lib),
  downloaded as an attachment. The certificate **record** (number, hash, issued date) is stored in
  Supabase `certificates` and reused — the PDF is re-rendered deterministically from that record.
- **Per course** (micro-credential). Programme-level certificates are out of scope for this task.
- Public verification page at **`/certificates/verify/<hash>`**.
