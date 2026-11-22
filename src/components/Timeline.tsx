"use client";

import { useState } from "react";

type Item = { label: string; short: string; from: string; to: string; dates: string };
type Data = { start: string; end: string; initial: string; lanes: { name: string; items: Item[] }[] };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const toIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/** Education, work, teaching, research and service on a single clock. */
export function Timeline({ data }: { data: Data }) {
  const start = toIndex(data.start);
  const span = toIndex(data.end) - start;
  const [month, setMonth] = useState(toIndex(data.initial) - start);
  const pct = (v: number) => `${(Math.max(0, Math.min(span, v)) / span) * 100}%`;
  const abs = month + start;
  const label = `${MONTHS[abs % 12]} ${Math.floor(abs / 12)}`;
  const active: (Item & { lane: string })[] = [];
  const firstYear = Math.ceil(start / 12);
  const lastYear = Math.floor((start + span) / 12);
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

  return (
    <div className="clock">
      {data.lanes.map((lane) => {
        // Place overlapping items on separate rows so no bar hides another.
        const rowEnds: number[] = [];
        const placed = lane.items.map((it) => {
          const a = toIndex(it.from) - start;
          const b = toIndex(it.to) - start + 1;
          let row = rowEnds.findIndex((end) => end <= a);
          if (row === -1) row = rowEnds.length;
          rowEnds[row] = b;
          return { it, a, b, row };
        });
        return (
          <div className="clock-lane" key={lane.name}>
            <span>{lane.name}</span>
            <div className="clock-track" style={{ height: 14 + rowEnds.length * 32 }}>
              {placed.map(({ it, a, b, row }) => {
                const on = month >= a && month < b;
                if (on) active.push({ ...it, lane: lane.name });
                return (
                  <div key={it.label} className="clock-bar" data-on={on} title={it.label} style={{ left: pct(a), top: 8 + row * 32, width: `max(10px, ${pct(b - a)})` }}>
                    {it.short}
                  </div>
                );
              })}
              <div className="clock-cursor" style={{ left: pct(month) }} aria-hidden="true" />
            </div>
          </div>
        );
      })}
      <div className="clock-lane" style={{ borderBottom: 0 }}>
        <span />
        <div className="clock-years" aria-hidden="true">
          {years.map((y) => (
            <span key={y} style={{ left: pct(y * 12 - start) }}>{y}</span>
          ))}
        </div>
      </div>
      <label htmlFor="clock-range" className="label" style={{ display: "block", marginTop: 16 }}>
        Move through time. Showing {label}
      </label>
      <input id="clock-range" type="range" min={0} max={span} value={month} aria-valuetext={label} onChange={(ev) => setMonth(Number(ev.target.value))} />
      <div aria-live="polite" className="grid grid-3" style={{ marginTop: 12 }}>
        {active.length === 0 && <p className="muted">Nothing recorded for this month.</p>}
        {active.map((a) => (
          <div key={a.label} className="card-box">
            <span className="label label-accent">{a.lane} / {a.dates}</span>
            <span style={{ fontWeight: 550 }}>{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
