"use client";

import { useState } from "react";
import { CloseIcon } from "./Icons";

/** Each control maps to a data attribute on <html>, styled in globals.css. */
export const readingOptions = [
  { key: "motion", on: "reduce", label: "Stop motion" },
  { key: "text", on: "large", label: "Larger text" },
  { key: "contrast", on: "high", label: "Higher contrast" },
  { key: "theme", on: "dark", label: "Dark theme" },
  { key: "font", on: "legible", label: "Legible font and spacing" },
  { key: "links", on: "underline", label: "Underline links" },
] as const;

export const READING_STORAGE_KEY = "osa-reading";

type Prefs = Record<string, string | undefined>;

function load(): Prefs {
  try {
    return JSON.parse(localStorage.getItem(READING_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function ReadingControls({ onClose }: { onClose: () => void }) {
  /* The panel only mounts after a click, so reading storage in the initialiser is safe. */
  const [prefs, setPrefs] = useState<Prefs>(load);

  const toggle = (key: string, on: string) => {
    const next = { ...prefs, [key]: prefs[key] === on ? undefined : on };
    setPrefs(next);
    const root = document.documentElement;
    if (next[key]) root.setAttribute(`data-${key}`, on);
    else root.removeAttribute(`data-${key}`);
    try {
      localStorage.setItem(READING_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: the change still applies to this page view */
    }
  };

  const reset = () => {
    readingOptions.forEach((o) => document.documentElement.removeAttribute(`data-${o.key}`));
    setPrefs({});
    try {
      localStorage.removeItem(READING_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="reading-panel" id="reading-controls" aria-label="Reading controls">
      <div className="wrap reading-inner">
        <p>Adjust how this site looks. Your choices are saved on this device only.</p>
        {readingOptions.map((o) => (
          <button key={o.key} type="button" className="toggle" aria-pressed={prefs[o.key] === o.on} onClick={() => toggle(o.key, o.on)}>
            {o.label}
          </button>
        ))}
        <button type="button" className="toggle" onClick={reset}>Reset</button>
        <button type="button" className="icon-btn" aria-label="Close reading controls" onClick={onClose} style={{ marginLeft: "auto" }}>
          <CloseIcon />
        </button>
      </div>
    </section>
  );
}

/** Inline script run before first paint so saved preferences never flash. */
export const readingBootScript = `(function(){try{var p=JSON.parse(localStorage.getItem('${READING_STORAGE_KEY}')||'{}');for(var k in p){if(p[k])document.documentElement.setAttribute('data-'+k,p[k]);}}catch(e){}})();`;
