import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
          borderRadius: 36,
          border: "2px solid rgba(139, 124, 255, 0.35)",
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#8B7CFF",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
