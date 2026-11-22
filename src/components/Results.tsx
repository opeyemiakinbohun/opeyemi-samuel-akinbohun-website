type Result = { value: string; label: string };

/** Outcome strip for a project: each figure or outcome is a documented fact, never an estimate. */
export function Results({ items, title = "Results" }: { items: Result[]; title?: string }) {
  if (!items.length) return null;
  return (
    <section className="results" aria-label={title}>
      <p className="results-title">{title}</p>
      <ul className="results-grid">
        {items.map((r) => (
          <li key={r.value + r.label}>
            <strong>{r.value}</strong>
            <span>{r.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
