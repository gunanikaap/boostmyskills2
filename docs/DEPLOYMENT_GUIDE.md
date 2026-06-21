# Deployment Guide

## Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.
4. Run the Supabase SQL schema before using auth or enrolments.
5. Optionally run supabase/seed.sql if the Supabase catalogue tables should mirror the static catalogue data.
6. Deploy.

## Build checks

Run these before submission:

~~~bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
~~~
