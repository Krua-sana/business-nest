---
name: add-event-page
description: "Add a new workshop/event to the Business Nest website (v2). Use whenever the user wants to add a workshop, event or meetup, e.g. 'I have a new workshop coming up', 'add an event for...', 'create a page for our next meetup'."
---

# Add a workshop (Business Nest v2)

In v2 a workshop is **data, not a new page**. One entry in `src/data/workshops.ts`
creates its card on `/workshops` (and Home, if it is in the first three) and its
detail page at `/workshops/<slug>`.

## Ask for

Required: title, date, time, location, one-line summary, intro paragraph, status
(`open` | `waitlist` | `past`), format (e.g. "In person · 4 hours"), a cover image.
Optional: agenda, learn steps, about + checklist, outcomes, expert or moderators,
testimonials, gallery photos.

## Steps

1. Put the image(s) in `public/images/`. For big files add a line to `JOBS` in
   `scripts/optimize-images.py` and run `npm run images`; use the
   `/images/web/...` path.
2. Copy the closest existing entry in `WORKSHOPS` (Financial Lab = about +
   outcomes + expert; AI Co-Creator = steps + moderators + testimonials + gallery;
   QA = who-it's-for + speaker). Put new/upcoming workshops **first** in the array.
3. Fill in the fields. `titleParts` splits the title into
   `[before, highlighted word, after]`. Leave out any section you have no content for.
4. To feature it at the top of `/workshops`, set `HIGHLIGHTED_SLUG` to its slug
   (optionally add a `highlight` line).
5. Add `/workshops/<slug>` to `dynamicRoutes` in `vite.config.ts` (sitemap).
6. `npm run build` to check, then `npm run deploy`.

When an edition ends, set `status: "past"` and update `seat` (badge "This edition
has ended", title "Be first to know about the next edition").
