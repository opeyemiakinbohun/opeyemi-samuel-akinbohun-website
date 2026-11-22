# Brand asset register

Logos identify organisations Opeyemi Samuel Akinbohun has a real relationship with. None implies endorsement. Barclays appears only in Career Journey, as a recruitment process he took part in, and never as an employer.

## Installed: official marks from Simple Icons

Source: the Simple Icons project (simpleicons.org), npm package `simple-icons`. The SVG data is released under CC0. Trademarks remain the property of their owners. Check each owner's guidelines before public launch.

| Mark | Where it appears | Relationship shown | Guidelines |
| --- | --- | --- | --- |
| ISC2 | Home, About, Academic activities | Certified in Cybersecurity (CC), earned | ISC2 brand guidance |
| Huawei | Home, About, Academic activities | HCIA Big Data, earned | e.huawei.com partner materials |
| IEEE | Publications | IEEE Internet of Things Journal, under review | brand-experience.ieee.org |
| ACM | Publications | ACM SAC 2027 and ACM TRUST 2027, submitted | ACM brand guidance |
| Elsevier | Publications | JISA (revised, under review) and Internet of Things (under review) | Elsevier brand guidance |
| Barclays | Career Journey card and article, About | Final-stage candidate, 2026. Applicant, not employee | Confirm Barclays' policy on descriptive use before launch |
| GitHub | Footer and Contact, only once a public account is confirmed | Owner's profile | github.com/logos |
| Python, Home Assistant, Wireshark, MQTT, Eclipse Mosquitto, Linux, Ubuntu, VirtualBox, Git, pandas, NumPy, scikit-learn, Jupyter, Next.js, Vercel, Stellar | Project pages, homepage modules, testbed diagram | Technology used | Each project's brand page |

## Not yet installed: shown as plain text

These could not be lawfully sourced from this build environment. Each shows its name as plain text, not an imitation, until you add the official file.

| Entry id | Organisation | Where to get the official file |
| --- | --- | --- |
| `huddersfield` | University of Huddersfield | University brand or marketing team |
| `jabu` | Joseph Ayo Babalola University | University communications office |
| `strathclyde` | University of Strathclyde | Strathclyde brand guidelines page |
| `spriteplus` | SPRITE+ | SPRITE+ team (spritehub.org) |
| `azure` | Microsoft Azure | Microsoft Azure architecture icons (learn.microsoft.com). Use the platform icon, not a certification badge |
| `scientificreports` | Scientific Reports | Springer Nature press office |
| `iet` | IET Blockchain | IET brand team |
| `linkedin` | LinkedIn | brand.linkedin.com |

## How to add one

1. Save the official file as `public/logos/<id>.svg` (or `.png`).
2. In `src/config/brands.ts`, replace the entry, for example:

```ts
huddersfield: { id: "huddersfield", name: "University of Huddersfield", kind: "file", src: "/logos/huddersfield.svg", width: 120, height: 40 },
```

`width` and `height` are the file's proportions. The logo is scaled to fit its slot without distortion. Add a row to the table above with the source and date.

## Rules

- Do not recolour, stretch or redraw a logo.
- Do not show the Microsoft Certified: Azure Administrator Associate badge until AZ-104 is passed.
- Do not show a full UK driving licence mark. The licence is in progress.
- Do not place Barclays in any list of employers, clients or partners.
