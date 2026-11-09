# Business Nest website (v2 — new design)

Rebuilt from the "Business Nest — Website redesign" Claude Design file.
Stack: Vite + React 18 + TypeScript + Tailwind CSS + React Router.

## Run it

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
npm run deploy     # build + publish dist/ with gh-pages (same as the old site)
```

## Where things live

| What | File |
|---|---|
| Design tokens (colours, fonts, radii) | `tailwind.config.ts`, `src/index.css` |
| Links (forms, cal.com, socials), contact, nav | `src/data/site.ts` |
| Experts + Home mentors | `src/data/experts.ts` |
| Workshops (cards + detail pages) | `src/data/workshops.ts` |
| Gallery photos | `src/data/gallery.ts` |
| Pages | `src/pages/*.tsx` |
| Header, footer, back-to-top bird | `src/components/Layout.tsx` |
| Egg photo, orbit rings, eggs | `src/components/Decor.tsx` |
| Cards, CTA bands, forms, lightbox pieces | `src/components/ui.tsx` |

## Pages

`/` · `/program` · `/workshops` · `/workshops/:slug` · `/experts` · `/gallery`

Old URLs redirect: `/events/*` → `/workshops/*`, `/program-spouses` → `/program`,
`/apply` → `/program#apply`, retired workshop pages → `/workshops`.

## Images

`public/` holds the same images as the old site (same paths). Heavy photos get
web-sized copies in `public/images/web/` — rerun after adding big photos:

```bash
npm run images     # needs Python 3 + Pillow
```

## Things to fill in

- `src/pages/Program.tsx` — `APPLICATIONS_CLOSE` and `SESSION_DATES` (hidden while empty).
- `src/data/workshops.ts` — Janine Simons' bio / LinkedIn (QA workshop).
- `src/data/gallery.ts` — check the event label of each older photo.

## Forms

Waiting-list sign-ups and "organise a workshop" proposals post to the Formspree
endpoint in `src/data/site.ts` (same one as the old site).

## Forms → Google Forms (email alerts + reminders)

Website forms: workshop sign-up, team booking, workshop proposal and expert
application. Each one posts to its own Google Form (answers saved in the Google
Sheet "Business Nest — website requests"). Until connected they fall back to
Formspree.

1. Open https://script.google.com → New project → paste `scripts/google-forms-setup.gs`.
2. Optional: set `NOTIFY_EMAIL` at the top. Run `setup` and allow the permissions.
3. Copy the `GOOGLE_FORMS` block from the log (or the "Website connection" tab of
   the sheet) into `src/data/forms.ts`, build and deploy.
4. Test each form on the live site; you should get an email per submission.

In the sheet, set **Status** to "Done" when a request is handled. Requests not
marked Done after 2 days appear in a daily reminder email.

## Deploying

`npm run deploy` builds the site and publishes it to the **gh-pages-new** branch of
github.com/Krua-sana/business-nest. GitHub Pages must be set to serve that branch
(Settings → Pages → Branch: gh-pages-new). The old site stays on the `gh-pages`
branch as a backup: switch Pages back to it to roll back. `public/CNAME` keeps
the business-nest.nl domain connected.
