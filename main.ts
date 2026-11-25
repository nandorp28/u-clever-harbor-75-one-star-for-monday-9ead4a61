// One Star for Monday — make.fun entry program (Node 22, stdlib only).
// Writes a single line: a one-star review of Monday as if it were a restaurant.
// Gate: /output/entry.txt is UTF-8 text of 1 to 180 characters, not only
// whitespace; the brief also caps the review at 25 words on a single line.
// The line is a genuine diner's complaint: a waiter, a dish brought back
// wrong, and a bill for something never ordered — about Monday itself.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. The waiter, Monday, took my weekend, brought back a 7 a.m. meeting, and charged me for coffee I never ordered.";

// Validate the line before writing it.
const chars = [...LINE].length;
if (chars < 1 || chars > 180) {
  throw new Error(`entry is ${chars} characters, gate needs 1-180`);
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("entry must not have leading/trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
const words = LINE.trim().split(/\s+/).length;
if (words > 25) {
  throw new Error(`entry is ${words} words, brief caps it at 25`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and confirm the file holds exactly the validated line.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}

console.log(
  `Wrote ${chars} characters, ${words} words, 1 line to ${outPath}`,
);
