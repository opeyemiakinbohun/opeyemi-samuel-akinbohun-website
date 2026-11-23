import Link from "next/link";
import { barclaysHref } from "@/lib/content";
import { Logo } from "./Logo";

/** Career Journey feature card. Barclays appears only as a recruitment experience, never as an employer. */
export function BarclaysFeature() {
  const href = barclaysHref();
  return (
    <article className="feature feature-light" id="barclays">
      <div className="stack">
        <div className="feature-mark">
          <Logo id="barclays" size={40} colour decorative />
          <div>
            <p style={{ fontWeight: 600 }}>Barclays</p>
            <p className="label">Final-stage candidate, 2026 / Radbroke campus</p>
          </div>
        </div>
        <p className="label">Career Journey / recruitment experience</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>What two Barclays Technology Developer final stages taught me</h2>
      </div>
      <div className="stack">
        <p className="lede" style={{ color: "var(--ink-2)" }}>
          In 2026 I reached the final assessment stage of two Barclays Technology Developer recruitment routes: the Discovery Programme and the main
          internship process. It changed how I prepare STAR examples, how I connect technical decisions to a bank&rsquo;s customers, and how I
          present my technical work as engineering evidence.
        </p>
        <p className="muted" style={{ fontSize: "0.92rem" }}>I was an applicant, not a Barclays employee. This is not an offer of employment or an endorsement.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href={href}>Read the full article</Link>
          <Link className="btn" href="/career">Career Journey</Link>
        </div>
      </div>
    </article>
  );
}
