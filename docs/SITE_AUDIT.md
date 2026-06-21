# Site Audit

Audit performed from public pages on 2026-06-20. Raw HTML snapshots are saved in reference/live-html/.

## Verified routes

| Route | Purpose | Notes |
| --- | --- | --- |
| / | Home | Hero, trending micro-programmes, certificate section, options, benefits, testimonials heading, partners. |
| /programs/ | Micro-programmes | Public programme catalogue. Ten programme cards were extracted. |
| /courses | Micro-credentials | Public HTML exposes search shell headed "Refine Your Search" and a client template for course cards. |
| /about | About us | Three content paragraphs about green jobs, partners and micro-programme framework. |
| /contact | Contact us | First name, last name, email and message form. Posts to /contact on legacy site. |
| /privacy | Privacy Policy | Fourteen policy sections. |
| /cookie_policy | Cookie Policy | Cookie purpose, parties, controls and transfers sections. |
| /tos | Terms and Conditions | Terms content appears as a single large heading in legacy markup. |

## Navigation

Header links: home logo, Catalogue dropdown, Micro-programmes, Micro-credentials, Register for free, Sign in.

Footer links: Self-Assessment, Privacy Policy, Cookie Policy, Terms and Conditions, RES4CITY, SHERLOCK, COSS, Contact Us, About us, LinkedIn.

## Auth behaviour

Public links use /register?next=... and /login?next=.... The live environment redirects these flows to apps.boostmyskills.eu. No credentials were stored or written during this restart.

## Enrolment behaviour

Programme cards link to https://boostmyskills.eu/dashboard/programs/<uuid>. The rebuild stores local Supabase enrolments and keeps the legacy URL as an external continuation link for programmes.

## Verified programme data

Programme titles, project labels, credential lists, images and legacy enrolment URLs were extracted to reference/live-html/programmes.json and copied into src/data/courses.ts.

## Implementation assumptions

- Supabase replaces the legacy auth backend.
- Micro-credentials are derived from verified titles in programme cards because unauthenticated course detail metadata was not exposed in static public HTML.
- Contact submissions are stored in Supabase when configured.
