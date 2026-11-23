import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHead } from "@/components/PageHead";
import { getProjects } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Projects",
  description: "Case studies across machine learning, digital forensics and independent software.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <>
      <PageHead
        crumbs={[{ label: "Projects" }]}
        eyebrow="Work"
        title="Projects and case studies"
        lede="Systems I have built, tested and evaluated. Each case study covers the problem, what I personally did, the stack, the results and the limits of the work. Research prototypes and independent projects, not commercial deployments."
      />
      <section className="section">
        <div className="wrap">
          <div className="pc-grid">
            {projects.map((p) => <ProjectCard key={p.meta.slug} meta={p.meta} />)}
          </div>
          <p className="muted" style={{ marginTop: 24 }}>
            Also see the <Link className="text-link" href="/cloud-lab">Azure Cloud Lab</Link>, where I document hands-on labs as I prepare for AZ-104.
          </p>
        </div>
      </section>
    </>
  );
}
