import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHead({ eyebrow, title, lede, crumbs, children }: { eyebrow?: string; title: string; lede?: string; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <header className="page-head">
      <div className="wrap">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              <li><Link href="/">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label}>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
