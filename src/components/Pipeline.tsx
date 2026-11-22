type Step = { title: string; text: string };

/** A numbered process diagram: horizontal steps with connectors on wide containers, a vertical list on narrow ones. */
export function Pipeline({ title, steps, caption }: { title: string; steps: Step[]; caption?: string }) {
  return (
    <figure className="pipeline">
      <p className="pipeline-title">{title}</p>
      <ol className="pipe">
        {steps.map((s, i) => (
          <li key={s.title} className="pipe-step">
            <span className="pipe-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {caption && <figcaption className="pipeline-foot">{caption}</figcaption>}
    </figure>
  );
}
