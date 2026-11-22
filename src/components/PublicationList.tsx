"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "./Logo";
import { StatusTag } from "./StatusTag";

type Pub = { slug: string; title: string; venue: string; publisher: string | null; publisherLogo: string; type: "journal" | "conference"; status: string; statusLabel: string };

const venueFilters = [
  { v: "all", label: "All" },
  { v: "journal", label: "Journals" },
  { v: "conference", label: "Conferences" },
] as const;

export function PublicationList({ items, filterable = true }: { items: Pub[]; filterable?: boolean }) {
  const [venue, setVenue] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const statuses = Array.from(new Map(items.map((i) => [i.status, i.statusLabel])).entries());
  const shown = items.filter((i) => (venue === "all" || i.type === venue) && (status === "all" || i.status === status));

  return (
    <div>
      {filterable && (
        <div className="btn-row" style={{ marginBottom: 20, gap: 8 }}>
          <div role="group" aria-label="Filter by venue type" className="btn-row" style={{ gap: 6 }}>
            {venueFilters.map((f) => (
              <button key={f.v} type="button" className="toggle" aria-pressed={venue === f.v} onClick={() => setVenue(f.v)}>{f.label}</button>
            ))}
          </div>
          <div role="group" aria-label="Filter by status" className="btn-row" style={{ gap: 6 }}>
            <button type="button" className="toggle" aria-pressed={status === "all"} onClick={() => setStatus("all")}>Any status</button>
            {statuses.map(([s, l]) => (
              <button key={s} type="button" className="toggle" aria-pressed={status === s} onClick={() => setStatus(s)}>{l}</button>
            ))}
          </div>
        </div>
      )}
      <p className="sr-only" aria-live="polite">{shown.length} manuscripts shown</p>
      <ol className="row-list">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link href={`/publications/${p.slug}`} className="pub-row">
              <LogoMark id={p.publisherLogo} size={24} />
              <span className="pub-title">{p.title}</span>
              <span>
                <span style={{ display: "block" }}>{p.venue}</span>
                <span className="label">{p.type === "journal" ? "Journal" : "Conference"}{p.publisher ? ` / ${p.publisher}` : ""}</span>
              </span>
              <StatusTag status={p.status} label={p.statusLabel} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
