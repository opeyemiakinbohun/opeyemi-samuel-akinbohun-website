import Link from "next/link";
import { site } from "@/config/site";
import { CvButton } from "./CvButton";
import { Logo } from "./Logo";

const columns = [
  { title: "Work", links: [
    { label: "Projects", href: "/projects" },
    { label: "PhD research", href: "/projects/smart-home-security-research" },
    { label: "MSc machine learning", href: "/projects/phishing-url-detection-machine-learning" },
    { label: "Digital forensics", href: "/projects/digital-forensics" },
    { label: "Azure Cloud Lab", href: "/cloud-lab" },
  ] },
  { title: "Research", links: [
    { label: "Research overview", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Academic activities", href: "/academic-activities" },
    { label: "Articles", href: "/insights" },
  ] },
  { title: "Career", links: [
    { label: "Career Journey", href: "/career" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "CV", href: "/cv" },
  ] },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="stack">
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.6rem", letterSpacing: "-0.03em", lineHeight: 1.1 }}>{site.name}</p>
            <p style={{ color: "var(--night-muted)" }}>{site.role}. {site.availability.status}, {site.availability.startShort.replace("From", "from")}. {site.availability.mobility}.</p>
            <p style={{ fontSize: "0.95rem" }}>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a><br />
              <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a>
            </p>
            <div className="btn-row" style={{ alignItems: "center" }}>
              <a className="icon-btn" href={site.contact.linkedin} rel="noopener noreferrer" aria-label="LinkedIn profile" style={{ textDecoration: "none" }}><Logo id="linkedin" size={16} decorative /></a>
              {site.contact.github && <a className="icon-btn" href={site.contact.github} rel="noopener noreferrer" aria-label="GitHub profile"><Logo id="github" size={18} decorative /></a>}
              <span className="night" style={{ background: "transparent" }}><CvButton small /></span>
            </div>
          </div>
          {columns.map((c) => (
            <nav key={c.title} aria-label={`${c.title} links`}>
              <p className="label" style={{ marginBottom: 12 }}>{c.title}</p>
              <ul>{c.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="footer-base">
          <span>&copy; {year} {site.name}</span>
          <span>
            <Link href="/accessibility">Accessibility</Link> / <Link href="/privacy">Privacy</Link> / <a href="/rss.xml">RSS</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
