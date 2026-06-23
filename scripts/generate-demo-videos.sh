#!/usr/bin/env bash
# Cinematic loop demos from poster art — replace with AI videos later via public/demos/
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ART="$ROOT/public/art"
OUT="$ROOT/public/demos"
mkdir -p "$OUT"

make_video() {
  local input="$1"
  local output="$2"
  local width="$3"
  local height="$4"
  local duration="${5:-10}"
  local frames=$((duration * 24))
  local sw=$((width * 2))
  local sh=$((height * 2))

  echo "→ $output (${width}x${height})"

  ffmpeg -y -hide_banner -loglevel error \
    -loop 1 -i "$input" \
    -vf "scale=${sw}:${sh}:force_original_aspect_ratio=increase,crop=${sw}:${sh},
         zoompan=z='min(1.0+0.0005*on,1.1)':x='(iw-iw/zoom)/2+sin(on/40)*iw*0.015':y='(ih-ih/zoom)/2+cos(on/55)*ih*0.012':d=${frames}:s=${width}x${height}:fps=24,
         eq=brightness=-0.05:contrast=1.08:saturation=1.12,
         vignette=PI/5" \
    -t "$duration" \
    -c:v libx264 -crf 24 -preset medium -pix_fmt yuv420p -movflags +faststart \
    "$OUT/$output"
}

make_video "$ART/cap-fullstack.png"   "jcb-digitalization.mp4"          1920 1080 10
make_video "$ART/cap-product.png"     "equipment-handover.mp4"          1080 1080 8
make_video "$ART/cap-ai.png"          "ai-manufacturing-assistant.mp4" 1920 1080 10
make_video "$ART/project-signal.png"  "fraudguard.mp4"                  1920 1080 10
make_video "$ART/cap-ai.png"          "building-copilot.mp4"            1920 1080 8
make_video "$ART/project-agents.png"  "building-automation.mp4"         1920 1080 8
make_video "$ART/project-neural.png"  "building-analytics.mp4"          1920 1080 8

echo ""
echo "Done. Files in $OUT:"
ls -lh "$OUT"/*.mp4
