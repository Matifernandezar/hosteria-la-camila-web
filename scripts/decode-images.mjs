import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public", "images");
const files = await readdir(imagesDir);

function assertWebP(image, label) {
  const isWebP =
    image.length >= 12 &&
    image.toString("ascii", 0, 4) === "RIFF" &&
    image.toString("ascii", 8, 12) === "WEBP";

  const complete = isWebP && image.readUInt32LE(4) + 8 === image.length;
  if (!complete) throw new Error(`Invalid WebP Base64 asset: ${label}`);
}

async function writeDecoded(outputName, base64, label) {
  const image = Buffer.from(base64.replace(/\s+/g, ""), "base64");
  assertWebP(image, label);
  // Fully decode pixels, not just the container header, before publishing.
  await sharp(image, { failOn: "warning" }).stats();
  await writeFile(path.join(imagesDir, outputName), image);
  console.log(`Generated public/images/${outputName} (${image.length} bytes)`);
}

// Only complete *.b64.txt files are production sources.
// Old multipart fragments (*.b64.partXX.txt) are deliberately ignored so an
// interrupted asset upload can never break a production build.
const standalone = files.filter(
  (name) => name.endsWith(".b64.txt") && !/\.b64\.part\d+\.txt$/.test(name),
);

for (const file of standalone) {
  const base = file.replace(/\.b64\.txt$/, "");
  const base64 = await readFile(path.join(imagesDir, file), "utf8");
  await writeDecoded(`${base}.webp`, base64, file);
}

if (!standalone.length) {
  console.log("No Base64 hotel images found.");
}
