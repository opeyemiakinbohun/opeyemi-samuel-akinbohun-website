# Opeyemi Samuel Akinbohun: personal website

The professional website of Opeyemi Samuel Akinbohun, cybersecurity PhD researcher at the University of Huddersfield. Built with Next.js 16 (App Router), React 19, TypeScript, Zod 4 and MDX. Every page is statically generated, so it is fast, cheap to host and works on Vercel's free plan.

## Run it locally

Requires Node.js 20.9 or later (Vercel uses a supported version by default).

```bash
npm install
npm run dev          # http://localhost:3000, drafts hidden
SHOW_DRAFTS=true npm run dev   # also shows draft articles, for your own review
```

## Checks

```bash
npm run check        # no em dashes or banned phrases, TypeScript, ESLint
npm run build        # production build (runs the copy check first)
npm run start        # serve the production build
npm run check:links -- http://localhost:3000   # crawl the running site, fail on any broken link
```

`npm run build` fails if any content or source file contains an em dash or a phrase from the writing policy's banned list (`scripts/check-copy.mjs`).

## Deploy to Vercel

1. Unzip this folder. In a terminal inside it, run `npm install` then `npm run build` once to confirm it builds on your machine (Node.js 20.9 or newer).
2. Push the folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Personal website"
   git branch -M main
   git remote add origin https://github.com/opeyemiakinbohun/<repository-name>.git
   git push -u origin main
   ```
3. In Vercel, choose **Add New > Project**, import the repository and keep the detected Next.js settings (build command `npm run build`, no output directory override).
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` set to your final address, for example `https://opeyemi-akinbohun.vercel.app` or your own domain. It is used for the sitemap, RSS feed and link previews. Leave `SHOW_DRAFTS` unset.
5. Deploy. To use your own domain, add it under **Settings > Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

Every later `git push` to `main` redeploys automatically. To roll back, open **Deployments** in Vercel and promote a previous deployment.

All articles and the Career Journey piece are set to public. To hide one again, set `visibility: "draft"` in its front matter.

## Adding an Azure lab

1. Copy `docs/lab-template.mdx` to `content/labs/<slug>.mdx`. The file name must match `slug`.
2. Put screenshots and any architecture diagram in `public/labs/<slug>/`. Remove tenant IDs, subscription IDs, public IP addresses and resource IDs first. The build fails if a listed image is missing.
3. Fill in the front matter (services, architecture, GitHub link, evidence list, cost note) and write under the eight standard headings. Each lab page shows how many of the eight sections are documented, so keep the heading wording exactly as in the template.
4. Set `status` to `in-progress` while you write it up, and to `completed` with a `completedAt` date only once the write-up and evidence are published.

The lab appears automatically on `/cloud-lab` in the right group and gets its own page at `/cloud-lab/<slug>`.

## Where things live

| What | Where |
| --- | --- |
| Name, contact details, availability, CV path, navigation | `src/config/site.ts` |
| Logos and their sources | `src/config/brands.ts`, `docs/brand-assets.md` |
| Design system (colours, type, spacing) | `src/app/globals.css` |
| Publications (5) | `content/publications/*.mdx` |
| Project case studies | `content/projects/*.mdx` |
| Articles | `content/insights/*.mdx` |
| Career Journey articles (Barclays) | `content/career/*.mdx` |
| Teaching, peer review, summer school | `content/activities/*.mdx` |
| Azure labs | `content/labs/*.mdx` |
| Education, experience, roles, credentials, skills, timeline, recruiter answers | `content/data/*.json` |
| CV PDF | `public/cv/Opeyemi-Samuel-Akinbohun-CV.pdf` |

Every content file is validated by the schemas in `src/lib/schemas.ts`. A missing or misspelt field stops the build with a clear message rather than publishing a broken page.

## Publishing an article

1. Copy an existing file in `content/insights/`, change the `slug` (it must match the filename) and the frontmatter.
2. Write the article in Markdown. End it with a `<Notes>` block for scope, limitations and further reading.
3. Keep `visibility: "draft"` while you review it with `SHOW_DRAFTS=true npm run dev`.
4. When it is ready, set `visibility: "public"`, `ownerApproved: true` and `publishedAt: "YYYY-MM-DD"`. It then appears on the Articles page, the homepage, the sitemap and the RSS feed.

Drafts never appear in production pages, the sitemap or RSS. A draft does not show a "Draft" label anywhere. It simply is not published.

## Updating a publication status

Edit the manuscript's file in `content/publications/`: change `status`, `statusLabel` and `statusAsOf`. When it is published, add `authors`, `doi` and `officialUrl`. Scholarly structured data is emitted only for published papers.

## Replacing the CV

Replace `public/cv/Opeyemi-Samuel-Akinbohun-CV.pdf` with your approved CV, keeping the same filename. Every "Download CV" button on the site points to it. The bundled file was generated from the `/cv` page of this site.

## Adding an official logo

See `docs/brand-assets.md`. In short: put the official SVG or PNG in `public/logos/`, then change that entry in `src/config/brands.ts` from `text(...)` to `kind: "file"` with its path and size.

## Design notes

The visual reference is Street Labs (street.app): a warm near-black ground, a neutral grotesque typeface, decisive headlines, stacked full-width sections, two-up panels, a keyword ticker and numbered editorial cards. Street's wordmark uses Helvetica Now, a commercial Monotype typeface. This site uses Inter Tight for headings and Inter for text, both under the SIL Open Font Licence, which match its character. IBM Plex Mono is used only for small technical labels. All fonts are self-hosted, so the site makes no requests to third-party font services.

Accessibility: reading controls in the header (stop motion, larger text, higher contrast, dark theme, legible font, underlined links), reduced-motion support, keyboard navigation with visible focus, skip link, semantic landmarks, and statuses shown with text and shape rather than colour alone.
