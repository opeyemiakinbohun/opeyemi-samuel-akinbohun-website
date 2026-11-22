/** The "Notes" block at the end of an article: context, limitations and references. */
export function Notes({ title = "Notes", children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="notes" aria-labelledby="notes-title">
      <h2 id="notes-title">{title}</h2>
      <div className="prose">{children}</div>
    </aside>
  );
}
