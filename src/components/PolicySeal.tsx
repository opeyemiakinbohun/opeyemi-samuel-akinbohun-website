import { site } from "@/config/site";

type Props = {
  /** Brief number shown in the centre. Omit for the section seal. */
  number?: number;
  /** Year or date line under the number. */
  date?: string;
  size?: number;
  label?: string;
};

/**
 * A rubber-stamp seal for policy briefs: circular text, double ring and a light ink texture.
 * Pure SVG, so it stays sharp at any size and needs no client JavaScript.
 */
export function PolicySeal({ number, date, size = 132, label = "Policy brief" }: Props) {
  const id = `seal-${number ?? "section"}`;
  const ring = `${label.toUpperCase()} • ${site.name.toUpperCase()} • `;
  const centre = number ? `No. ${String(number).padStart(2, "0")}` : "Policy";
  return (
    <svg className="policy-seal" width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={number ? `${label} number ${number}` : label}>
      <defs>
        <path id={`${id}-path`} d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
        <filter id={`${id}-ink`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={number ?? 7} result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.7 1.32" result="speckle" />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${id}-ink)`} fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="94" strokeWidth="4" />
        <circle cx="100" cy="100" r="86" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="54" strokeWidth="1.5" />
        <text fill="currentColor" stroke="none" fontSize="13.5" fontWeight="700" letterSpacing="2.2" fontFamily="var(--font-mono), monospace">
          <textPath href={`#${id}-path`} textLength="440" lengthAdjust="spacing">{ring}</textPath>
        </text>
        <text x="100" y={date ? 100 : 107} textAnchor="middle" fill="currentColor" stroke="none" fontSize={number ? 24 : 21} fontWeight="800" fontFamily="var(--font-display), sans-serif">{centre}</text>
        {date && <text x="100" y="122" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11" fontWeight="600" letterSpacing="1.5" fontFamily="var(--font-mono), monospace">{date}</text>}
        <path d="M62 136 h76" strokeWidth="1.5" />
        <path d="M62 64 h76" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
