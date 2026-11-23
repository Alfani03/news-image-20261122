import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const input = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const output = join(outDir, "entry.png");

const stat = statSync(input);
if (!stat.isFile()) {
  throw new Error(`entry.png at ${input} is not a regular file`);
}
const buf = readFileSync(input);
const size = stat.size;
if (size > 1024 * 1024) {
  throw new Error(
    `entry.png is ${size} bytes, over the 1 MiB (1048576 bytes) limit — regenerate a smaller image`,
  );
}
const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(pngSig)) {
  throw new Error("entry.png is not a PNG file (bad signature)");
}
if (buf.length < 33 || buf.toString("ascii", 12, 16) !== "IHDR") {
  throw new Error("entry.png has no IHDR chunk");
}
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
const bitDepth = buf[24];
const colourType = buf[25];
if (width !== 1024 || height !== 1024) {
  throw new Error(`entry.png is ${width}x${height}, expected 1024x1024`);
}
if (bitDepth !== 8) {
  throw new Error(`entry.png bit depth is ${bitDepth}, expected 8`);
}
if (colourType !== 2) {
  throw new Error(`entry.png colour type is ${colourType}, expected 2 (truecolour RGB)`);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(output, buf);
// Verify the copy is byte-identical to the validated source.
const written = readFileSync(output);
if (!written.equals(buf)) {
  throw new Error(`output at ${output} differs from entry.png — copy failed`);
}
console.log(`OK: copied ${size} bytes, 1024x1024 RGB PNG -> ${output} (byte-identical)`);
