import Link from "next/link";
import { site } from "@/config/site";
import { BarclaysFeature } from "@/components/BarclaysFeature";
import { Capabilities } from "@/components/Capabilities";
import { CvButton } from "@/components/CvButton";
import { GlanceBar } from "@/components/GlanceBar";
import { Logo } from "@/components/Logo";
import { ProjectCard, ResultList, StackTags } from "@/components/ProjectCard";
import { QuickAnswers } from "@/components/QuickAnswers";
import { Stamp } from "@/components/Stamp";
import { WhyHireMe } from "@/components/WhyHireMe";
import highlights from "../../content/data/highlights.json";
import { getActivities, getAnswers, getArticles, getPolicyBriefs, getProjects, getRoles, tagLabel } from "@/lib/content";

/** Square arrow button used on cards. Points right, never up. */
function ArrowBox() {
  return (
    <span className="r-arrowbox" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
    </span>
  );
}

export default function Home() {
  const projects = getProjects();
  const byslug = (s: string) => projects.find((p) => p.meta.slug === s);
  const briefs = getPolicyBriefs();
  const activities = getActivities();
  const articles = getArticles();
  const roles = getRoles();

  return (
    <div className="r-home">
      {/* Hero */}
      <section className="r-hero" aria-labelledby="hero-title">
        <div className="wrap r-hero-grid">
          <div className="r-hero-copy">
            <h1 id="hero-title" className="r-display">
              Cybersecurity researcher <span className="r-dim">and engineer.</span>
            </h1>
            <p className="r-sub">
              Current PhD researcher in Cybersecurity at the University of Huddersfield, working across applied cryptography, network security, digital
              forensics and machine learning. Open to industry and academic roles across the UK.
            </p>
            <div className="r-btns">
              <CvButton className="r-btn-lime" />
              <Link className="r-btn r-btn-soft" href="/projects">See my work</Link>
            </div>
            <ul className="r-ticks">
              <li>MSc Cybersecurity and Digital Forensics, Distinction</li>
              <li>BSc Computer Science, First Class Honours</li>
            </ul>
          </div>

          <div className="r-hero-visual r-hero-visual-solo" aria-label="Verified credentials">
            <div className="r-hcard r-hcard-solo">
              <p className="r-hcard-label">Verified</p>
              <ul className="r-hverified">
                <li><Logo id="huddersfield" size={22} decorative /><span>MSc and LTHE 1, PhD in progress</span></li>
                <li><Logo id="isc2" size={22} decorative /><span>ISC2 Certified in Cybersecurity</span></li>
                <li><Logo id="scientificreports" size={22} decorative /><span>Reviewer, Scientific Reports</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust grid */}
      <section className="r-section" aria-labelledby="trust-title">
        <div className="wrap">
          <h2 id="trust-title" className="r-h2">
            Trained, certified and trusted to review. <span className="r-dim">Across universities, publishers and industry.</span>
          </h2>
          <Link className="r-textlink" href="/about">Read my background</Link>
          <div className="r-trust">
            <div className="r-trust-grid">
              {highlights.trust.map((t) => (
                <Link key={t.logo + t.caption} href={t.href} className="r-tile">
                  <ArrowBox />
                  <span className="r-tile-logo"><Logo id={t.logo} size={34} decorative /></span>
                  <span className="r-tile-cap">{t.caption}</span>
                </Link>
              ))}
            </div>
            <Link href="/policy" className="r-feature">
              <ArrowBox />
              <span className="r-feature-top">Policy writing</span>
              <span className="r-feature-num">{briefs.length}</span>
              <span className="r-feature-cap">policy briefs on post-quantum cryptography, financial regulation and smart-device law</span>
            </Link>
          </div>
        </div>
      </section>

      <Capabilities />

      {/* Platform statement and big cards */}
      <section className="r-section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <h2 id="work-title" className="r-h1">
            One researcher across the security stack. <span className="r-dim">Cryptography, networks, forensics and data.</span>
          </h2>
          <div className="r-btns">
            <Link className="r-btn r-btn-lime" href="/projects">See my projects</Link>
            <Link className="r-btn r-btn-soft" href="/policy">Read my policy briefs</Link>
          </div>

          <div className="r-cards-2">
            <Link href="/projects/digital-forensics" className="r-card">
              <div className="r-card-head">
                <h3>Digital forensics <span className="r-dim">evidence handled step by step in MSc practicals</span></h3>
                <ArrowBox />
              </div>
              <div className="r-ui">
                <div className="r-ui-bar"><i /><i /><i /><span>MSc forensic practicals</span></div>
                <ul className="r-ui-list">
                  {highlights.forensicsTools.map((c, i) => (
                    <li key={c}><span className="r-mono r-dim">{String(i + 1).padStart(2, "0")}</span>{c}<span className="r-pill">used</span></li>
                  ))}
                </ul>
                <p className="r-ui-note">Academic coursework exercises, not professional investigations.</p>
              </div>
              <StackTags tools={byslug("digital-forensics")?.meta.tools ?? []} max={6} />
              <ResultList results={byslug("digital-forensics")?.meta.results ?? []} max={4} />
              <span className="read-more">Read more</span>
            </Link>

            <Link href="/projects/phishing-url-detection-machine-learning" className="r-card">
              <div className="r-card-head">
                <h3>Phishing URL detection <span className="r-dim">from eight classifiers to an SME prototype</span></h3>
                <ArrowBox />
              </div>
              <div className="r-ui">
                <div className="r-ui-bar"><i /><i /><i /><span>MSc dissertation, 70/30 split</span></div>
                <ul className="r-ui-list">
                  {highlights.classifiers.map((c, i) => (
                    <li key={c}><span className="r-mono r-dim">{String(i + 1).padStart(2, "0")}</span>{c}<span className="r-pill">evaluated</span></li>
                  ))}
                </ul>
                <p className="r-ui-note">Confusion matrices, ROC curves and learning curves, then a web prototype for SMEs improved through user feedback.</p>
              </div>
              <StackTags tools={byslug("phishing-url-detection-machine-learning")?.meta.tools ?? []} max={6} />
              <ResultList results={byslug("phishing-url-detection-machine-learning")?.meta.results ?? []} max={4} />
              <span className="read-more">Read more</span>
            </Link>
          </div>

          <div className="pc-grid" style={{ marginTop: 24 }}>
            {["zeroseal", "citizen", "omela"].map((sl) => {
              const p = byslug(sl);
              return p ? <ProjectCard key={sl} meta={p.meta} maxTools={6} /> : null;
            })}
          </div>
          <Link href="/academic-activities" className="r-card r-card-sm teach-card" style={{ marginTop: 24 }}>
            <div className="r-card-head"><h3>Teaching and review <span className="r-dim">at master&apos;s and journal level</span></h3><ArrowBox /></div>
            <ul className="r-mini r-mini-row">
              {activities.slice(0, 3).map((a) => (
                <li key={a.meta.slug}><strong>{a.meta.title}</strong><span>{a.meta.period}</span></li>
              ))}
            </ul>
            <span className="read-more">Read more</span>
          </Link>
        </div>
      </section>

      <WhyHireMe />

      {/* Career Journey */}
      <section className="r-section" aria-labelledby="career-title">
        <div className="wrap">
          <h2 id="career-title" className="r-h2">Learning from industry recruitment. <span className="r-dim">What two Barclays final stages taught me.</span></h2>
          <div style={{ marginTop: 28 }}><BarclaysFeature /></div>
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
        <section className="r-section" id="writing" aria-labelledby="writing-title">
          <div className="wrap">
            <h2 id="writing-title" className="r-h2">Read my technical writing. <span className="r-dim">Cryptography, post-quantum and policy.</span></h2>
            <Link className="r-textlink" href="/insights">All articles</Link>
            <div className="r-cards-2" style={{ marginTop: 28 }}>
              {articles.slice(0, 4).map((a) => (
                <Link key={a.meta.slug} href={`/insights/${a.meta.slug}`} className="r-card r-card-sm">
                  <div className="r-card-head"><Stamp category={a.meta.category} minutes={a.readingMinutes} /><ArrowBox /></div>
                  <h3 className="r-article-title">{a.meta.title}</h3>
                  <p className="r-muted">{a.meta.description}</p>
                  <p>{a.meta.tags.slice(0, 3).map((t) => <span key={t} className="tag-mini">{tagLabel(t)}</span>)}</p>
                  <span className="read-more">Read more</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Roles */}
      <section className="r-section" id="roles" aria-labelledby="roles-title">
        <div className="wrap">
          <h2 id="roles-title" className="r-h2">Roles I am open to. <span className="r-dim">Industry and academic, anywhere in the UK, from January 2028.</span></h2>
          <Link className="r-textlink" href="/opportunities">Role fit and evidence</Link>
          <div className="r-roles">
            {roles.map((r) => (
              <Link key={r.family} href="/opportunities" className="r-role">
                <strong>{r.family}</strong>
                <span>{r.titles.join(", ")}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ask */}
      <section className="r-section r-ask" aria-labelledby="qa-title">
        <div className="wrap">
          <h2 id="qa-title" className="r-h1 r-center">Ask what employers usually ask</h2>
          <p className="r-sub r-center">For recruiters, hiring managers and employers: type a question about my availability, right to work, skills or research. Answers come from this site, with a link to the source.</p>
          <div className="r-ask-box"><QuickAnswers answers={getAnswers()} /></div>
        </div>
      </section>

      {/* Closing */}
      <section className="r-section r-close" aria-labelledby="cta-title">
        <div className="wrap r-split">
          <h2 id="cta-title" className="r-h1">Hiring for 2028? <span className="r-dim">Let&rsquo;s talk.</span></h2>
          <div className="r-close-right">
            <p className="r-sub" style={{ marginTop: 0 }}>Email, phone or LinkedIn all reach me directly.</p>
            <p className="r-contact">
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <a href={`tel:${site.contact.phoneHref}`}>{site.contact.phoneDisplay}</a>
            </p>
            <div className="r-btns">
              <CvButton className="r-btn-lime" />
              <a className="r-btn r-btn-dark" href={site.contact.linkedin} rel="noopener noreferrer">LinkedIn</a>
              {site.contact.github && (
                <a className="r-btn r-btn-dark" href={site.contact.github} rel="noopener noreferrer"><Logo id="github" size={18} decorative />GitHub</a>
              )}
            </div>
          </div>
        </div>
      </section>

      <GlanceBar label={highlights.barLabel} items={highlights.items} />
    </div>
  );
}
