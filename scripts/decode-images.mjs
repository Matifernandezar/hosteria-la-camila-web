import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const imagesDir = path.join(process.cwd(), "public", "images");
const files = await readdir(imagesDir);

function assertWebP(image, label) {
  const isWebP =
    image.length >= 12 &&
    image.toString("ascii", 0, 4) === "RIFF" &&
    image.toString("ascii", 8, 12) === "WEBP";

  if (!isWebP) throw new Error(`Invalid WebP Base64 asset: ${label}`);
}

async function writeDecoded(outputName, base64, label) {
  const image = Buffer.from(base64.replace(/\s+/g, ""), "base64");
  assertWebP(image, label);
  await writeFile(path.join(imagesDir, outputName), image);
  console.log(`Generated public/images/${outputName} (${image.length} bytes)`);
}

const multipart = new Map();
for (const file of files) {
  const match = file.match(/^(.*)\.b64\.part(\d+)\.txt$/);
  if (!match) continue;
  const [, base, part] = match;
  const parts = multipart.get(base) ?? [];
  parts.push({ file, part: Number(part) });
  multipart.set(base, parts);
}

for (const [base, parts] of multipart) {
  parts.sort((a, b) => a.part - b.part);
  const chunks = await Promise.all(
    parts.map(({ file }) => readFile(path.join(imagesDir, file), "utf8")),
  );
  await writeDecoded(`${base}.webp`, chunks.join(""), parts.map((p) => p.file).join(", "));
}

const multipartBases = new Set(multipart.keys());
const standalone = files.filter((name) => name.endsWith(".b64.txt"));

for (const file of standalone) {
  const base = file.replace(/\.b64\.txt$/, "");
  if (multipartBases.has(base)) continue;
  const base64 = await readFile(path.join(imagesDir, file), "utf8");
  await writeDecoded(`${base}.webp`, base64, file);
}

if (!multipart.size && !standalone.length) {
  console.log("No Base64 hotel images found.");
}
