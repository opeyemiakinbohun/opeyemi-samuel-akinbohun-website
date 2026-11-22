"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/config/site";
import { ChevronDown, CloseIcon, DownloadIcon, MenuIcon, ReadingIcon } from "./Icons";
import { ReadingControls } from "./ReadingControls";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [reading, setReading] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  /* Close menus on navigation, adjusting state during render rather than in an effect. */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const cvHref = site.cvFile ?? "/cv";

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand-mark" aria-hidden="true">{site.monogram}</span>
          <span className="brand-name">{site.name}</span>
        </Link>

        <nav ref={navRef} className="nav" aria-label="Primary">
          {navigation.map((group) =>
            group.items ? (
              <div className="nav-group" key={group.label}>
                <button
                  type="button"
                  className="nav-trigger"
                  aria-expanded={open === group.label}
                  aria-controls={`menu-${group.label}`}
                  data-active={group.items.some((i) => isActive(pathname, i.href))}
                  onClick={() => setOpen(open === group.label ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown />
                </button>
                {open === group.label && (
                  <ul className="nav-menu" id={`menu-${group.label}`}>
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                          {item.label}
                          {item.description && <span className="nav-desc">{item.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={group.label} href={group.href} className="nav-link" aria-current={isActive(pathname, group.href) ? "page" : undefined}>
                {group.label}
              </Link>
            ),
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Reading controls"
            aria-expanded={reading}
            aria-controls="reading-controls"
            onClick={() => setReading(!reading)}
          >
            <ReadingIcon />
          </button>
          <a className="btn btn-small header-cv" href={cvHref} download={site.cvFile ? "" : undefined}>
            <DownloadIcon /> CV
          </a>
          <Link className="btn btn-primary btn-small header-cv" href="/contact">
            Contact
          </Link>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {reading && <ReadingControls onClose={() => setReading(false)} />}

      {mobile && (
        <div className="mobile-panel" id="mobile-menu">
          <nav className="wrap" aria-label="Mobile">
            {navigation.map((group) => (
              <div key={group.label}>
                <h2>{group.label}</h2>
                <ul>
                  {(group.items ?? [{ label: group.label, href: group.href }]).map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="btn-row" style={{ marginTop: 24 }}>
              <a className="btn btn-primary" href={cvHref} download={site.cvFile ? "" : undefined}>
                <DownloadIcon /> {site.cvLabel}
              </a>
              <Link className="btn" href="/contact">Contact</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
