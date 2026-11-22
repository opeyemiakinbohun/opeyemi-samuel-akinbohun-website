"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

type Item = { label: string; value: string; href: string };

const noSubscribe = () => () => {};
function readHidden() {
  try {
    return sessionStorage.getItem("osa-glance") === "hidden";
  } catch {
    return false;
  }
}

/** A slim bar pinned to the bottom of the homepage with verified, static facts. Dismissible. */
export function GlanceBar({ label, items }: { label: string; items: Item[] }) {
  const [dismissed, setDismissed] = useState(false);
  /* Read the stored choice on the client only, so server and first client render match. */
  const storedHidden = useSyncExternalStore(noSubscribe, readHidden, () => false);
  if (dismissed || storedHidden) return null;
  return (
    <aside className="glance" aria-label={label}>
      <div className="glance-inner">
        <span className="glance-label">{label}:</span>
        <ul className="glance-list">
          {items.map((i) => (
            <li key={i.label}>
              <Link href={i.href}>
                <span>{i.label}:</span>
                <strong>{i.value}</strong>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="glance-close"
          aria-label="Hide this bar"
          onClick={() => {
            setDismissed(true);
            try {
              sessionStorage.setItem("osa-glance", "hidden");
            } catch {
              /* ignore */
            }
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </aside>
  );
}
