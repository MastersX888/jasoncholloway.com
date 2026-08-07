import { ImageResponse } from "next/og";
import { books } from "@/lib/data/books";
import fs from "fs";
import path from "path";

export const alt = "Masters X Omnibus Edition cover";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const omnibus = books.find((b) => b.slug === "omnibus");
  if (!omnibus) return new ImageResponse(<div />);

  let coverDataUrl = "";
  try {
    const coverPath = path.join(
      process.cwd(),
      "public",
      (omnibus.coverImageHC ?? omnibus.coverImagePB).replace(/^\//, ""),
    );
    const coverBuffer = fs.readFileSync(coverPath);
    coverDataUrl = `data:image/png;base64,${coverBuffer.toString("base64")}`;
  } catch (e) {
    console.error("Failed to load omnibus cover for OG", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5rem",
            width: "100%",
            height: "100%",
          }}
        >
          {coverDataUrl ? (
            <img
              src={coverDataUrl}
              alt={omnibus.title}
              style={{
                width: "auto",
                height: "100%",
                maxHeight: "480px",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                border: "1px solid #222",
              }}
            />
          ) : (
            <div style={{ width: "320px", height: "480px", background: "#222" }} />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#f5f0e8",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#8a6d3b",
                marginBottom: "1.5rem",
              }}
            >
              Masters X · Complete
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Omnibus Edition
            </div>
            <div style={{ fontSize: "36px", color: "#a0a0a0", marginBottom: "3rem" }}>
              All three novels in one volume
            </div>
            <div style={{ fontSize: "28px", color: "#777" }}>
              Jason C. Holloway · Seventh City Press
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
