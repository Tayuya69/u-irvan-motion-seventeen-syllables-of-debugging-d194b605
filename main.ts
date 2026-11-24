import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One haiku about debugging, three lines in the 5-7-5 syllable shape.
// Line 1 (5): One(1) red(1) line(1) in(1) logs(1)
// Line 2 (7): a(1) thou-sand(2) green(1) ones(1) whis-per(2)
// Line 3 (5): it(1) was(1) a(1) ty-po(2)
const HAIKU = [
  "One red line in logs",
  "a thousand green ones whisper",
  "it was a typo",
].join("\n") + "\n";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), HAIKU, "utf8");

// Post-write read-back verification: re-read the written entry and confirm it matches.
{
  const __fs = await import("node:fs");
  const __path = await import("node:path");
  const __dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const __file = __path.join(__dir, "entry.txt");
  const __expected = "One red line in logs\na thousand green ones whisper\nit was a typo\n";
  const __actual = __fs.readFileSync(__file, "utf8");
  if (__actual !== __expected) {
    throw new Error(`read-back mismatch in ${__file}: got ${JSON.stringify(__actual)}`);
  }
  if (__actual.length !== 65) {
    throw new Error(`read-back length mismatch: ${__actual.length}`);
  }
}
