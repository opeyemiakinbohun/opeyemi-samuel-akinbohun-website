type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ChevronDown = (p: P) => (
  <svg viewBox="0 0 12 12" {...base} {...p}><path d="M2 4l4 4 4-4" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ReadingIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="4.5" r="2" /><path d="M5 8.5h14M12 8.5V21M8.5 21l3.5-6.5 3.5 6.5" /></svg>
);
export const DownloadIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} width="16" height="16"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
);
export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} width="18" height="18"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
);
export const ExternalIcon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p} width="14" height="14" style={{ display: "inline-block", verticalAlign: "-2px" }}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
