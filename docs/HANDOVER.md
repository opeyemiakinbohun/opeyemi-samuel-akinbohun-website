# Handover checklist

Status as of 21 November 2026.

## Built and connected

- Home, Projects (5 case studies), Research, Publications (5 detail pages), Academic Activities (5 entries), Articles (4 drafts plus topic pages), Azure Cloud Lab, Career Journey (Barclays article), About, Opportunities, Contact, CV (web and PDF), Accessibility, Privacy, 404, sitemap, robots, RSS and Open Graph image.
- Navigation: Work, Research, Publications, Articles, Career Journey, About, plus CV and Contact buttons. Full mobile menu.
- Barclays: in the top navigation (Career Journey), as a homepage feature card, at the top of `/career`, and on About. The full article is at `/career/barclays-technology-developer-assessment-learning`.
- The link checker found no broken internal links in either the draft preview or the production build.

## Needs your approval before it goes live

The five articles below are written and complete, but stay hidden in production until you set `visibility: "public"`:

- [ ] Homomorphic Encryption: Computing on Data Without Decrypting It
- [ ] Paillier Encryption in Practice: What the Public and Private Keys Actually Do
- [ ] Understanding Replay, Spoofing and Flooding Attacks in MQTT Smart Homes
- [ ] Why Reproducibility Matters in Cybersecurity Research
- [ ] What Two Barclays Technology Developer Final Stages Taught Me

Until the Barclays article is approved, its homepage and About cards link to the Barclays summary on `/career`, so no visitor ever reaches a missing page.

Before approving the four technical articles, check the "Further reading" sources against the original publications and add links.

## Verify before launch

- [ ] Manuscript statuses (recorded as November 2026).
- [ ] Which GitHub account is public: `yungthacreator` or `opeyemiakinbohun`. Then set `contact.github` in `src/config/site.ts`.
- [ ] ISC2 CC and Huawei HCIA Big Data verification links or credential IDs.
- [ ] The Zenodo dataset DOI and its access status. It is not shown publicly yet.
- [ ] ZeroSeal and Citizen descriptions. These are based on your own earlier descriptions, because the live sites could not be opened from the build environment.
- [ ] The Rufus Giwa Polytechnic internship title. This entry is hidden until confirmed.
- [ ] The start month of the MSc on the Career Journey timeline (shown as 2023 to 2024).
- [ ] Replace the generated CV PDF with your approved CV, if you prefer.
- [ ] Official logo files for the eight organisations listed in `docs/brand-assets.md`.
- [ ] Barclays' policy on descriptive use of its logo.
- [ ] A domain name, then set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Deliberately not on the site

- Experimental figures (throughput, latency, audit counts). These come from different campaigns and will be added from approved papers.
- Unpublished optimisation methods, private repositories, the restricted dataset, VM snapshot names and internal addresses.
- Salary, visa status and supervisor names.
