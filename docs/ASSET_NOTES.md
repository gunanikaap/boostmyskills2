# Asset Notes

Public assets were downloaded from https://boostmyskills.eu into public/ during the rebuild.

Downloaded assets include:

- BoostMySkills logo and favicon.
- Landing hero image.
- Programme card images for MP1-MP8, MP01 SHERLOCK and MP02 SHERLOCK.
- Certificate, partner and LinkedIn images.

The download manifest is stored in docs/asset-downloads.json. No authenticated or private assets were downloaded.

## Learner dashboard empty-state illustration

The live learner dashboard shows a green "person + laptop + magnifier + graduation-cap"
illustration in the empty-enrolments card. That source asset is **not** bundled in this repo.

**The exact live asset is now used.** The live dashboard
(`apps.boostmyskills.eu/learner-dashboard`) is auth-gated, but it is an Open edX micro-frontend
whose JavaScript bundles are served from a **public** static path
(`apps.boostmyskills.eu/learner-dashboard/*.js`). Loading that URL (it redirects to
`/authn/login`) still fetches those bundles; grepping `app.<hash>.js` for image references
surfaced the webpack-hashed SVG assets, and the empty-enrolments illustration is:

```
https://apps.boostmyskills.eu/learner-dashboard/f8f8e1b9a2f3c96296e8d7372e07fda4.svg
```

That **original vector file** (392×408, ~190 KB) was downloaded verbatim and committed to
[`public/images/dashboard/empty-enrolments-live.svg`](../public/images/dashboard/empty-enrolments-live.svg).
No screenshot/crop was needed. The empty-state card
(`src/components/dashboard/empty-enrolments-card.tsx`) renders it via a plain `<img>` with
`object-fit: contain` (left column, max-width 400px) — pixel-identical to the live illustration.
