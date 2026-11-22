/** Status shown with text and a distinct shape so it never relies on colour alone. */
const shapes: Record<string, { variant: string; path: React.ReactNode }> = {
  submitted: { variant: "", path: <circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" /> },
  "under-review": { variant: "tag-dashed", path: <path d="M5.5 1a4.5 4.5 0 0 1 0 9z" fill="currentColor" stroke="currentColor" strokeWidth="1" /> },
  "revised-under-review": { variant: "tag-dashed", path: <><circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><circle cx="5.5" cy="5.5" r="2" fill="currentColor" /></> },
  accepted: { variant: "tag-solid", path: <path d="M1.5 5.8l2.6 2.6L9.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  published: { variant: "tag-solid", path: <path d="M1.5 5.8l2.6 2.6L9.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  earned: { variant: "tag-solid", path: <path d="M1.5 5.8l2.6 2.6L9.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  completed: { variant: "tag-solid", path: <path d="M1.5 5.8l2.6 2.6L9.5 3" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  "in-progress": { variant: "tag-dashed", path: <path d="M9 3.5A4 4 0 1 0 9.5 7" fill="none" stroke="currentColor" strokeWidth="1.4" /> },
  planned: { variant: "tag-quiet", path: <circle cx="5.5" cy="5.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" /> },
  draft: { variant: "tag-dashed", path: <path d="M2 9l1-3 5-5 2 2-5 5z" fill="none" stroke="currentColor" strokeWidth="1.2" /> },
};

export function StatusTag({ status, label }: { status: string; label: string }) {
  const s = shapes[status] ?? shapes.planned;
  return (
    <span className={`tag ${s.variant}`}>
      <svg viewBox="0 0 11 11" aria-hidden="true">{s.path}</svg>
      {label}
    </span>
  );
}
