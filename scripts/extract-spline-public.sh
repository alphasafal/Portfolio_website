#!/usr/bin/env bash
# Extract self-hosted .splinecode from a public my.spline.design URL (no watermark overlay).
set -euo pipefail

URL="${1:-https://my.spline.design/robotfollowcursorforlandingpagemc-fcRu6CjaKdSCE9Ogtu24cSzA/}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/spline/hero-robot.splinecode"
TMP="$(mktemp)"

curl -sL "$URL" -o "$TMP"
node - "$TMP" "$OUT" <<'NODE'
const fs = require('fs');
const [,, input, output] = process.argv;
const h = fs.readFileSync(input, 'utf8');
const marker = 'app.start([';
const start = h.indexOf(marker);
if (start === -1) throw new Error('Could not find embedded scene in page');
let i = start + marker.length;
let depth = 1;
while (i < h.length && depth > 0) {
  if (h[i] === '[') depth++;
  else if (h[i] === ']') depth--;
  i++;
}
const bytes = h.slice(start + marker.length, i - 1).split(',').map((n) => parseInt(n.trim(), 10));
fs.writeFileSync(output, Buffer.from(bytes));
console.log(`Wrote ${bytes.length} bytes → ${output}`);
NODE

rm -f "$TMP"
