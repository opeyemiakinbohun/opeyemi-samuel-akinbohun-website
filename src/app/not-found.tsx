import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ borderBottom: 0 }}>
      <div className="wrap stack">
        <p className="label label-accent">404</p>
        <h1>This page does not exist.</h1>
        <p className="lede">It may have moved or been renamed.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/">Home</Link>
          <Link className="btn" href="/projects">Projects</Link>
          <Link className="btn" href="/publications">Publications</Link>
        </div>
      </div>
    </section>
  );
}
