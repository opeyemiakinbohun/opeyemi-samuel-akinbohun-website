import { brand, isWide } from "@/config/brands";

type Props = {
  id: string;
  size?: number;
  /** Use the brand's own colour instead of the surrounding text colour. */
  colour?: boolean;
  /** Set when a visible label already names the organisation. */
  decorative?: boolean;
};

/** Renders an official brand mark from the asset register, or its name as plain text. */
export function Logo({ id, size = 28, colour = false, decorative = false }: Props) {
  const b = brand(id);
  if (!b) return null;
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": b.name };

  if (b.kind === "icon") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={colour || b.brandColour ? `#${b.icon.hex}` : "currentColor"} className="logo-mark" {...a11y}>
        <path d={b.icon.path} />
      </svg>
    );
  }
  if (b.kind === "file") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={b.src} alt={decorative ? "" : b.name} width={(b.width / b.height) * size} height={size} className="logo-file" data-logo={b.id} />;
  }
  return (
    <span className="logo-text" style={{ height: size, fontSize: Math.max(11, size * 0.42) }} {...a11y}>
      {b.short ?? b.name}
    </span>
  );
}

/** A logo inside a tile. Wide official files get a wider tile. */
export function LogoMark({ id, size = 24, style }: { id: string; size?: number; style?: React.CSSProperties }) {
  return (
    <span className={`mark${isWide(id) ? " wide" : ""}`} aria-hidden="true" style={style}>
      <Logo id={id} size={size} decorative />
    </span>
  );
}

/** A logo with its relationship label, e.g. "ISC2 CC / Earned". */
export function LogoBadge({ id, title, status, href }: { id: string; title: string; status: string; href?: string }) {
  const body = (
    <>
      <span className={`logo-badge-mark${isWide(id) ? " wide" : ""}`}><Logo id={id} size={26} decorative /></span>
      <span className="logo-badge-text">
        <span className="logo-badge-title">{title}</span>
        <span className="logo-badge-status">{status}</span>
      </span>
    </>
  );
  return href ? <a className="logo-badge" href={href}>{body}</a> : <span className="logo-badge">{body}</span>;
}
