import { z } from "zod";

/** Links rendered on the site must be web URLs, never javascript: or data: schemes. */
const webUrl = () => z.url({ protocol: /^https?$/ });

/** Publishing state shared by every MDX collection. */
export const visibility = z.enum(["public", "draft", "private"]);
export const verification = z.enum(["documented", "owner-reported", "publicly-verified", "to-confirm"]);

const base = {
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(3),
  visibility,
  verificationStatus: verification,
  lastVerifiedAt: z.string().nullable(),
};

export const publicationSchema = z.object({
  ...base,
  order: z.number(),
  venue: z.string(),
  venueShort: z.string(),
  publisher: z.string().nullable(),
  type: z.enum(["journal", "conference"]),
  status: z.enum(["submitted", "under-review", "revised-under-review", "accepted", "published"]),
  statusLabel: z.string(),
  statusAsOf: z.string(),
  summary: z.string(),
  topics: z.array(z.string()),
  authors: z.array(z.string()),
  doi: z.string().nullable(),
  officialUrl: webUrl().nullable(),
  relatedProjects: z.array(z.string()),
  relatedDatasets: z.array(z.string()),
  publisherLogo: z.string(),
});

export const projectSchema = z.object({
  ...base,
  order: z.number(),
  kind: z.string(),
  summary: z.string(),
  status: z.string(),
  period: z.string(),
  skills: z.array(z.string()),
  tools: z.array(z.string()),
  liveUrl: webUrl().nullable(),
  repositoryUrl: webUrl().nullable(),
  relatedPublications: z.array(z.string()),
  featured: z.boolean(),
  logos: z.array(z.string()).default([]),
  results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
});

export const articleSchema = z.object({
  ...base,
  description: z.string(),
  category: z.string(),
  contentType: z.enum(["explainer", "research-note", "analysis", "news-analysis", "tutorial", "personal-reflection", "policy-brief"]),
  tags: z.array(z.string()),
  publishedAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  ownerApproved: z.boolean(),
  sources: z.array(z.object({ title: z.string(), url: webUrl().nullable() })),
  relatedProjects: z.array(z.string()),
  /** Policy briefs only: the summary panel and seal shown at the top of the article. */
  brief: z
    .object({
      number: z.number().int().positive(),
      question: z.string().min(10),
      audience: z.string(),
      recommendations: z.array(z.string()).min(1),
    })
    .nullable()
    .default(null),
});

export const activitySchema = z.object({
  ...base,
  order: z.number(),
  kind: z.enum(["summer-school", "teaching", "reviewing", "representation", "conference", "workshop"]),
  role: z.string(),
  host: z.string(),
  period: z.string(),
  location: z.string().nullable(),
  summary: z.string(),
  evidenceUrl: webUrl().nullable(),
  evidenceLabel: z.string().nullable(),
  participationStatus: z.enum(["verified", "completed", "ongoing", "invitation-accepted", "planned"]),
  logos: z.array(z.string()).default([]),
});

/** A screenshot or diagram stored under public/labs/<slug>/. The build fails if the file is missing. */
const labImage = z.object({
  src: z.string().regex(/^\/labs\/[a-z0-9-]+\/[\w.-]+\.(png|jpg|jpeg|webp|svg)$/i, { error: "Lab images must live in /labs/<slug>/" }),
  alt: z.string().min(8),
  caption: z.string(),
});

export const labSchema = z.object({
  ...base,
  order: z.number(),
  status: z.enum(["planned", "in-progress", "completed"]),
  services: z.array(z.string()),
  objective: z.string(),
  /** One or two sentences describing the architecture. */
  architecture: z.string().nullable().default(null),
  architectureDiagram: labImage.nullable().default(null),
  /** AZ-104 skill areas the lab practises, as named in the exam outline. */
  examAreas: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  startedAt: z.string().nullable().default(null),
  completedAt: z.string().nullable(),
  github: webUrl().nullable().default(null),
  evidence: z.array(labImage).default([]),
  /** Short note on what the lab cost and how resources were removed. */
  cost: z.string().nullable().default(null),
});

export const careerSchema = articleSchema;

export type Publication = z.infer<typeof publicationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Article = z.infer<typeof articleSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Lab = z.infer<typeof labSchema>;

/* JSON data files */

export const educationSchema = z.array(
  z.object({
    id: z.string(),
    award: z.string(),
    institution: z.string(),
    period: z.string(),
    outcome: z.string(),
    details: z.array(z.string()),
    link: z.object({ label: z.string(), href: z.string() }).nullable(),
    logo: z.string(),
  }),
);

export const experienceSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    organisation: z.string(),
    period: z.string(),
    location: z.string().nullable(),
    group: z.enum(["teaching", "research", "professional", "earlier"]),
    summary: z.string(),
    points: z.array(z.string()),
    visibility,
  }),
);

export const rolesSchema = z.array(
  z.object({
    family: z.string(),
    titles: z.array(z.string()),
    evidence: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.string() })),
  }),
);

export const credentialsSchema = z.array(
  z.object({
    name: z.string(),
    issuer: z.string(),
    status: z.enum(["earned", "completed", "in-progress", "planned"]),
    statusLabel: z.string(),
    note: z.string().nullable(),
    verificationUrl: webUrl().nullable(),
    logo: z.string(),
  }),
);

export const skillsSchema = z.array(
  z.object({ area: z.string(), summary: z.string(), items: z.array(z.string()), evidence: z.array(z.object({ label: z.string(), href: z.string() })) }),
);

export const answersSchema = z.array(
  z.object({ question: z.string(), keywords: z.string(), answer: z.string(), href: z.string(), hrefLabel: z.string() }),
);

export const timelineSchema = z.object({
  start: z.string(),
  end: z.string(),
  initial: z.string(),
  lanes: z.array(
    z.object({
      name: z.string(),
      items: z.array(z.object({ label: z.string(), short: z.string(), from: z.string(), to: z.string(), dates: z.string() })),
    }),
  ),
});

export const datasetsSchema = z.array(
  z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    access: z.enum(["public", "restricted", "private"]),
    accessLabel: z.string(),
    availability: z.string(),
    relatedPublications: z.array(z.string()),
    publicUrl: webUrl().nullable(),
  }),
);
