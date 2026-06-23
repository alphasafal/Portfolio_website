import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#09090B",
          color: "#FAFAFA",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#8B7CFF",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          {SITE.tagline}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginBottom: 24 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 28, color: "#A1A1AA", maxWidth: 900, lineHeight: 1.4 }}>
          {SITE.oneLiner}
        </div>
        <div style={{ marginTop: 48, fontSize: 24, color: "#8B7CFF" }}>
          {SITE.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
