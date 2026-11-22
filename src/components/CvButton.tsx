import { site } from "@/config/site";
import { DownloadIcon } from "./Icons";

export function CvButton({ variant = "primary", small = false, className = "" }: { variant?: "primary" | "plain"; small?: boolean; className?: string }) {
  const href = site.cvFile ?? "/cv";
  const cls = `btn ${variant === "primary" ? "btn-primary" : ""} ${small ? "btn-small" : ""} ${className}`;
  return (
    <a className={cls} href={href} download={site.cvFile ? "" : undefined} type={site.cvFile ? "application/pdf" : undefined}>
      <DownloadIcon />
      {site.cvLabel}
    </a>
  );
}
