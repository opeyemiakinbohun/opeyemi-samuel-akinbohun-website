import { CvButton } from "@/components/CvButton";
import { PageHead } from "@/components/PageHead";
import { Logo } from "@/components/Logo";
import { site } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: `Contact ${site.name} by email, phone or LinkedIn.`,
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  const rows: { k: string; v: string; href: string; logo?: string }[] = [
    { k: "Email", v: c.email, href: `mailto:${c.email}` },
    { k: "Phone", v: c.phoneDisplay, href: `tel:${c.phoneHref}` },
    { k: "LinkedIn", v: c.linkedinLabel, href: c.linkedin, logo: "linkedin" },
    ...(c.github ? [{ k: "GitHub", v: c.github.replace("https://", ""), href: c.github, logo: "github" }] : []),
  ];
  return (
    <>
      <PageHead crumbs={[{ label: "Contact" }]} eyebrow="Contact" title={site.name} lede="The quickest way to reach me is by email. For recruiters, hiring managers and employers, my CV is below, and I am happy to arrange a call." />
      <section className="section" style={{ borderBottom: 0 }}>
        <div className="wrap split">
          <ul className="row-list">
            {rows.map((r) => (
              <li key={r.k} style={{ padding: "20px 0", display: "grid", gridTemplateColumns: "120px minmax(0,1fr)", gap: 16, alignItems: "baseline" }}>
                <span className="label" style={{ display: "flex", alignItems: "center", gap: 8 }}>{r.logo && <Logo id={r.logo} size={14} decorative />}{r.k}</span>
                <a href={r.href} className="pub-title" style={{ overflowWrap: "anywhere" }} rel={r.k === "LinkedIn" || r.k === "GitHub" ? "noopener noreferrer" : undefined}>{r.v}</a>
              </li>
            ))}
          </ul>
          <div className="stack">
            <dl className="facts">
              <dt>Based in</dt><dd>{site.location}</dd>
              <dt>Seeking</dt><dd>{site.availability.status}</dd>
              <dt>Start</dt><dd>{site.availability.start}</dd>
              <dt>Mobility</dt><dd>{site.availability.mobility}</dd>
            </dl>
            <CvButton />
            <p className="muted" style={{ fontSize: "0.92rem" }}>This site has no contact form, so nothing you send is stored here. Messages go straight to my email.</p>
          </div>
        </div>
      </section>
    </>
  );
}
