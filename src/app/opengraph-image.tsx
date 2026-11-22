import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";
export const alt = `${site.name}, cybersecurity researcher`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", padding: 72, borderTop: "16px solid #111111" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: "#111111" }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#e4381f" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#111111", lineHeight: 1.05 }}>I build and evaluate secure systems.</div>
          <div style={{ fontSize: 30, color: "#3b3b3b" }}>Cybersecurity PhD researcher, University of Huddersfield</div>
        </div>
        <div style={{ fontSize: 26, color: "#b42a14" }}>Open to UK industry and academic roles from January 2028</div>
      </div>
    ),
    size,
  );
}
