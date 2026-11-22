import { StatusTag } from "./StatusTag";
import { LAB_SECTIONS } from "@/lib/content";

type Status = "planned" | "in-progress" | "completed";

export function labStatusLabel(status: Status, completedAt: string | null) {
  if (status === "completed") return completedAt ? `Completed ${completedAt}` : "Completed";
  if (status === "in-progress") return "In progress";
  return "Planned";
}

export function LabStatus({ status, completedAt }: { status: Status; completedAt: string | null }) {
  return <StatusTag status={status} label={labStatusLabel(status, completedAt)} />;
}

/** Shows which of the standard write-up sections are documented, so visitors can see how complete a lab is. */
export function LabProgress({ sections, compact = false }: { sections: { section: string; documented: boolean }[]; compact?: boolean }) {
  const done = sections.filter((s) => s.documented).length;
  if (compact) {
    return (
      <p className="lab-progress-line">
        <span className="lab-bar" aria-hidden="true"><span style={{ width: `${(done / LAB_SECTIONS.length) * 100}%` }} /></span>
        {done} of {LAB_SECTIONS.length} write-up sections documented
      </p>
    );
  }
  return (
    <div className="lab-progress">
      <p className="pc-label">Write-up progress: {done} of {LAB_SECTIONS.length} sections</p>
      <ul>
        {sections.map((s) => (
          <li key={s.section} className={s.documented ? "is-done" : ""}>
            <span className="lab-check" aria-hidden="true" />
            {s.section}
            <span className="sr-only">{s.documented ? ": documented" : ": not yet documented"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
