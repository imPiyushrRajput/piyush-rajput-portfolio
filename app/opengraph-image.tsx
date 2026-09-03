import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const initials = profile.name
  .split(" ")
  .map((n) => n[0])
  .slice(0, 2)
  .join("");

// Social share card. Monochrome to match the site's theme.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row: monogram + site */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "96px",
              height: "96px",
              border: "2px solid #2e2e2e",
              borderRadius: "24px",
              fontSize: "44px",
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            {initials}
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: "#8f8f8f" }}>
            piyushrajput.me
          </div>
        </div>

        {/* Name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 800,
              letterSpacing: "-4px",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "40px",
              color: "#a3a3a3",
              marginTop: "16px",
            }}
          >
            {profile.role}
          </div>
        </div>

        {/* Bottom: tech line */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "1px",
              background: "#2e2e2e",
              marginBottom: "28px",
            }}
          />
          <div style={{ display: "flex", fontSize: "28px", color: "#8f8f8f" }}>
            React · TypeScript · Microfrontends · RAG · Nearly 6 years
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
