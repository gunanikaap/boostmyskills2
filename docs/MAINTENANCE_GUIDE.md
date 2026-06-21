# Maintenance Guide

## Add a new micro-programme

Edit src/data/courses.ts and add a new item to programmes with title, slug, code, project, image, provider, duration, credential titles and status.

If you also maintain the Supabase catalogue tables, add the equivalent SQL row to supabase/seed.sql or use the Supabase table editor after running the schema.

## Add a new micro-credential

Add the credential title to the relevant programme's credentialTitles. Unique credential pages are generated automatically.

## Connect credentials to programmes

The connection is the programme's credentialTitles array. Reuse the same title text to connect an existing credential.

## Update images

Place images under public/images/programmes/ and update the image path in src/data/courses.ts.

## Update legal pages

Edit src/data/legal.ts. Legacy routes redirect to the maintained legal routes.

## Update header/footer links

Edit src/data/navigation.ts.
