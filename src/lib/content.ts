import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { site } from "@/config/site";
import {
  activitySchema,
  answersSchema,
  articleSchema,
  careerSchema,
  credentialsSchema,
  datasetsSchema,
  educationSchema,
  experienceSchema,
  labSchema,
  projectSchema,
  publicationSchema,
  rolesSchema,
  skillsSchema,
  timelineSchema,
} from "./schemas";

const ROOT = path.join(process.cwd(), "content");

export type Entry<T> = { meta: T; body: string; readingMinutes: number };

/** Draft and private records never reach production pages, feeds or the sitemap. */
function isVisible(v: string) {
  return v === "public" || (v === "draft" && site.features.showDrafts);
}

/** Every collection record carries a slug that matches its filename and a visibility flag. */
type CollectionRecord = { slug: string; visibility: string };

function readCollection<S extends z.ZodType<CollectionRecord>>(dir: string, schema: S): Entry<z.infer<S>>[] {
  const folder = path.join(ROOT, dir);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(folder, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(`Invalid frontmatter in content/${dir}/${file}:\n${z.prettifyError(parsed.error)}`);
      }
      const meta: z.infer<S> = parsed.data;
      if (`${meta.slug}.mdx` !== file) throw new Error(`Slug and filename differ in content/${dir}/${file}`);
      const words = content.split(/\s+/).filter(Boolean).length;
      return { meta, body: content, readingMinutes: Math.max(1, Math.round(words / 220)) };
    })
    .filter((e) => isVisible(e.meta.visibility));
}

function readJson<S extends z.ZodType>(file: string, schema: S): z.infer<S> {
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, "data", file), "utf8"));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) throw new Error(`Invalid data in content/data/${file}:\n${z.prettifyError(parsed.error)}`);
  return parsed.data;
}

const byOrder = <T extends { meta: { order: number } }>(a: T, b: T) => a.meta.order - b.meta.order;

export const getPublications = () => readCollection("publications", publicationSchema).sort(byOrder);
export const getPublication = (slug: string) => getPublications().find((p) => p.meta.slug === slug);

export const getProjects = () => readCollection("projects", projectSchema).sort(byOrder);
export const getProject = (slug: string) => getProjects().find((p) => p.meta.slug === slug);

export const getActivities = () => readCollection("activities", activitySchema).sort(byOrder);
export const getActivity = (slug: string) => getActivities().find((a) => a.meta.slug === slug);

/** Standard write-up sections for a lab. A section counts as documented when the MDX body has a matching "## " heading. */
export const LAB_SECTIONS = [
  "Objective and architecture",
  "Azure services used",
  "Configuration and implementation",
  "Validation evidence",
  "Problems and troubleshooting",
  "Security considerations",
  "Lessons learned",
  "Cleanup and cost",
] as const;

export function labSectionStatus(body: string) {
  const headings = new Set([...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim().toLowerCase()));
  return LAB_SECTIONS.map((s) => ({ section: s, documented: headings.has(s.toLowerCase()) }));
}

export const getLabs = () => {
  const labs = readCollection("labs", labSchema).sort(byOrder);
  for (const l of labs) {
    const images = [...l.meta.evidence, ...(l.meta.architectureDiagram ? [l.meta.architectureDiagram] : [])];
    for (const img of images) {
      if (!fs.existsSync(path.join(process.cwd(), "public", img.src))) {
        throw new Error(`Lab "${l.meta.slug}" lists evidence ${img.src}, but public${img.src} does not exist.`);
      }
    }
    if (l.meta.status === "completed" && !l.meta.completedAt) throw new Error(`Lab "${l.meta.slug}" is completed but has no completedAt date.`);
  }
  return labs;
};
export const getLab = (slug: string) => getLabs().find((l) => l.meta.slug === slug);

const byDate = <T extends { meta: { publishedAt: string | null; title: string } }>(a: T, b: T) =>
  (b.meta.publishedAt ?? "9999").localeCompare(a.meta.publishedAt ?? "9999") || a.meta.title.localeCompare(b.meta.title);

export const getArticles = () => readCollection("insights", articleSchema).sort(byDate);
export const getArticle = (slug: string) => getArticles().find((a) => a.meta.slug === slug);

export const getCareerEntries = () => readCollection("career", careerSchema).sort(byDate);
export const getCareerEntry = (slug: string) => getCareerEntries().find((a) => a.meta.slug === slug);

/** Counts every draft, including hidden ones, so pages can say honestly what is in review. */
export function countDrafts(dir: "insights" | "career") {
  const folder = path.join(ROOT, dir);
  if (!fs.existsSync(folder)) return 0;
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .filter((f) => matter(fs.readFileSync(path.join(folder, f), "utf8")).data.visibility === "draft").length;
}

export const getEducation = () => readJson("education.json", educationSchema);
export const getExperience = () => readJson("experience.json", experienceSchema).filter((e) => isVisible(e.visibility));
export const getRoles = () => readJson("roles.json", rolesSchema);
export const getCredentials = () => readJson("credentials.json", credentialsSchema);
export const getSkills = () => readJson("skills.json", skillsSchema);
export const getAnswers = () => readJson("quick-answers.json", answersSchema);
export const getTimeline = () => readJson("timeline.json", timelineSchema);
export const getDatasets = () => readJson("datasets.json", datasetsSchema);

export const categories = [
  { slug: "cryptography", label: "Cryptography", description: "Homomorphic encryption, public-key schemes and privacy-enhancing technologies." },
  { slug: "cybersecurity", label: "Cybersecurity", description: "Network attacks, security engineering and threat modelling." },
  { slug: "digital-forensics", label: "Digital Forensics", description: "Evidence handling, network investigation and incident analysis." },
  { slug: "advanced-research", label: "Research Methods", description: "Reproducibility, experiments and reading research critically." },
  { slug: "software-engineering", label: "Software Engineering", description: "Python, testing and building reliable research tooling." },
  { slug: "data-and-machine-learning", label: "Data and Machine Learning", description: "Data analysis, classification and model evaluation." },
  { slug: "cloud", label: "Cloud Computing", description: "Azure administration and cloud security from hands-on labs." },
  { slug: "policy", label: "Policy", description: "Policy briefs on cyber security, cryptography and financial regulation, with practical recommendations." },
  { slug: "technology-analysis", label: "Technology Analysis", description: "Dated, sourced commentary on developments that matter to engineers." },
] as const;

/** Policy briefs, newest first by brief number. */
export const getPolicyBriefs = () =>
  getArticles()
    .filter((a) => a.meta.category === "policy" && a.meta.brief)
    .sort((a, b) => (b.meta.brief?.number ?? 0) - (a.meta.brief?.number ?? 0));

export const categoryLabel = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? slug;

/** The Barclays article if it is visible in this build, otherwise its summary on /career. */
export const BARCLAYS_SLUG = "barclays-technology-developer-assessment-learning";
export function barclaysHref() {
  return getCareerEntry(BARCLAYS_SLUG) ? `/career/${BARCLAYS_SLUG}` : "/career#barclays";
}

/** Tags across all visible articles, with counts, most used first. */
export function getAllTags() {
  const counts = new Map<string, number>();
  for (const a of getArticles()) for (const t of a.meta.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()].map(([slug, count]) => ({ slug, count, label: tagLabel(slug) })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

const TAG_WORDS: Record<string, string> = { mqtt: "MQTT", nist: "NIST", ncsc: "NCSC", iot: "IoT", paillier: "Paillier", psti: "PSTI", england: "England" };
export function tagLabel(slug: string) {
  if (slug === "post-quantum") return "Post-quantum";
  if (slug === "bank-of-england") return "Bank of England";
  return slug
    .split("-")
    .map((w, i) => TAG_WORDS[w] ?? (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ")
    .replace(/^Iot\b/, "IoT");
}
