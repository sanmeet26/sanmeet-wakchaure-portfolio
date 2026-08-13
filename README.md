# Sanmeet Wakchaure — portfolio

Personal portfolio site. Single page, dark theme, static build.

**Stack:** React 18 · TypeScript · Vite 6 · Tailwind CSS 3 · Framer Motion · Lenis · Headless UI · Lucide + React Icons

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Dev server with HMR                           |
| `npm run build`     | Typecheck, then production build into `dist/` |
| `npm run preview`   | Serve the built output locally                |
| `npm run lint`      | ESLint over the whole project                 |
| `npm run typecheck` | `tsc --noEmit`, no build output               |

Node 18 or newer.

---

## Editing content

All copy and data live in `src/data/`. No component needs to change to update the site.

| File            | Holds                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| `profile.ts`    | Name, title, hero taglines, About paragraphs, contact details, resume path |
| `experience.ts` | Timeline entries — newest first, rendered in array order                   |
| `skills.ts`     | Skill categories, their blurbs and accent colours                          |
| `projects.ts`   | Project cards, features, challenges, repo links                            |
| `social.ts`     | GitHub / LinkedIn / LeetCode plus the contact-card channels                |
| `education.ts`  | Degree and achievements                                                    |
| `stats.ts`      | The stats strip — most values are derived, not typed in                    |
| `seo.ts`        | Canonical URL, meta description, OG image path                             |

`src/types/index.ts` defines the shape of each file, so a typo surfaces as a type error rather than a blank section.

Two things to know:

- **Years of experience is computed**, not hardcoded. `careerStart` in `profile.ts` drives
  `getYearsOfExperience()`, so the stat stays accurate without edits.
- **Site metadata lives in one file.** `site.meta.json` at the repo root holds the canonical URL,
  title, description, OG image and keywords. A Vite plugin fills the `%PLACEHOLDER%` tokens in
  `index.html` at build time and generates `robots.txt` and `sitemap.xml` from it, while
  `src/data/seo.ts` imports the same file. **To change the deployed domain, edit that one value.**

### Replacing the placeholder photo

Drop your image into `public/` and point `profile.avatarPath` at it. A square image, 800×800 or larger, works best. The current `profile-placeholder.svg` is a generated stand-in.

### Replacing the resume

Overwrite `public/Sanmeet_Wakchaure_Resume.pdf`, keeping the filename, or update `profile.resumePath`.

---

## Contact form

The form posts to a serverless function at `/api/contact` which sends mail through [Resend](https://resend.com). The API key stays server-side — it is never exposed to the browser.

1. Create a Resend account and verify a sending domain.
2. Copy `.env.example` to `.env` for local development and fill in:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=wakchauresanmeet3@gmail.com
CONTACT_FROM_EMAIL=portfolio@your-verified-domain.com
```

3. Add the same three variables in your host's dashboard before deploying.

Never prefix these with `VITE_` — that would bundle the key into the client build.

The function runs on Vercel's Edge runtime and calls Resend over plain `fetch`, so there is no SDK
dependency. It validates fields server-side, escapes submitted text before putting it in the email
body, sets `reply_to` to the sender, and carries a honeypot field that bots fill and people never see.
If the environment variables are missing it returns 503 and the form shows an "email me directly"
fallback instead of failing silently.

There is no rate limiting. If the form attracts abuse, add Vercel's firewall rules or a KV-backed
counter keyed on IP.

---

## Deploying

### Vercel (recommended — the contact function needs it)

1. Push the repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo.
3. Vercel detects Vite. Confirm: build command `npm run build`, output directory `dist`.
4. Add `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` under **Settings → Environment Variables**.
5. Deploy. The `api/` directory is picked up automatically as serverless functions — no extra config.

### Netlify

Netlify works for the static site, but the contact function needs to move from `api/` to `netlify/functions/` first.

1. **Add new site → Import an existing project**, pick the repo.
2. Build command `npm run build`, publish directory `dist`.
3. Add the same environment variables under **Site configuration → Environment variables**.
4. Because this is a single-page app, add a `public/_redirects` file containing:

```
/*  /index.html  200
```

---

## A note on the Tailwind theme

Colour keys are named `night` / `surface` / `card` / `line` / `ink` rather than `base` / `text`, because a
custom colour named `base` collides with Tailwind's built-in `text-base` font size and wins silently —
which turns any `sm:text-base` label near-black on a dark page. Same reason `bg-grid-64` carries the
size suffix: `backgroundImage.grid` and `backgroundSize.grid` would both compile to `bg-grid`.

## Accessibility and motion

Audited with axe-core (WCAG 2.1 A/AA plus best-practice) at 390px, 768px and 1440px: **no
violations**. Keyboard sweep confirms every focusable stop has a visible indicator, the mobile menu
traps focus and closes on Escape, and the skip link is the first stop.

`ink-faint` is `#83838D`, not the darker grey the palette started with — the original measured 4.11:1
against the background, under the 4.5:1 minimum, and it carries real text.

Reduced motion is handled in two layers, because one is not enough. `MotionConfig reducedMotion="user"`
stops Framer animating, but a variant's `hidden` state still applies as the initial style — which left
content at `opacity: 0`, offset 24px, permanently. So components also read `useMotionEnabled()` and
start from the visible state. Verified: with reduced motion the hero has `transform: none`,
`opacity: 1`, and nothing anywhere on the page is hidden before scrolling. Lenis, the cursor glow, the
card tilt and the looping scroll hint all switch off too.

## Performance notes

Fonts import the **latin subset only** (`@fontsource/inter/latin-400.css`, not `/400.css`). The
unsuffixed imports ship cyrillic, greek and vietnamese too — dropping them halved the font file count
and cut the stylesheet from 14.3kB to 7.1kB gzipped.

Framer Motion and the icon sets are split into their own chunks so they do not block first paint.
Pointer tracking (cursor glow, hero parallax, card tilt) is held in Framer `MotionValue`s rather than
React state, so it never triggers a re-render.

Section-level `React.lazy` was considered and rejected: the sections would not exist in the DOM on
load, which breaks the scroll spy and deep links, and the placeholder heights would cause layout
shift. `content-visibility: auto` was tried and reverted for the same class of reason — see the
comment in `globals.css` for the measurement.

---

## Build phases

- [x] Phase 1 — project setup, folder structure, typed data layer
- [x] Phase 2 — global theme, layout, navigation, background layer, shared components
- [x] Phase 3 — Hero (API console signature, typing tagline) and About (portrait, focus chips, stats strip)
- [x] Phase 4 — Experience timeline (scroll-drawn rail) and Skills grid
- [x] Phase 5 — Projects (generated artifact previews, pointer tilt, gradient rings)
- [x] Phase 6 — Resume section and Contact (cards, validated form, Resend Edge function)
- [x] Phase 7 — motion polish, accessibility audit, SEO single-source, performance

---

Built with React. Content is mine; the code is free to borrow.
