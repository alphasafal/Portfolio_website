import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
          border: "1px solid rgba(139, 124, 255, 0.35)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#8B7CFF",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
