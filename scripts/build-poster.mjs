/**
 * Extracts a WebP poster frame from the hero MP4 (ffmpeg-static).
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegPath from "ffmpeg-static";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const videoPath = join(root, "src/videos/video-visaogeralapp.mp4");
const outDir = join(root, "src/assets/images");
const outPath = join(outDir, "hero-video-poster.webp");

if (!existsSync(videoPath)) {
  console.warn("build-poster: skip (video not found):", videoPath);
  process.exit(0);
}

if (!ffmpegPath) {
  console.warn("build-poster: skip (ffmpeg-static binary unavailable)");
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });

execFileSync(
  ffmpegPath,
  [
    "-nostats",
    "-loglevel",
    "error",
    "-y",
    "-ss",
    "0.25",
    "-i",
    videoPath,
    "-vframes",
    "1",
    "-vf",
    "scale=1280:-1:flags=lanczos",
    "-c:v",
    "libwebp",
    "-quality",
    "78",
    outPath,
  ],
  { stdio: "pipe" },
);

console.log("Poster:", outPath);
