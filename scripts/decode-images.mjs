import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const imagesDir = path.join(process.cwd(), "public", "images");
const files = (await readdir(imagesDir)).filter((name) => name.endsWith(".b64.txt"));

if (!files.length) {
  console.log("No Base64 hotel images found.");
  process.exit(0);
}

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const outputName = file.replace(/\.b64\.txt$/, ".webp");
  const outputPath = path.join(imagesDir, outputName);
  const base64 = (await readFile(inputPath, "utf8")).trim();
  const image = Buffer.from(base64, "base64");

  const isWebP =
    image.length >= 12 &&
    image.toString("ascii", 0, 4) === "RIFF" &&
    image.toString("ascii", 8, 12) === "WEBP";

  if (!isWebP) {
    throw new Error(`Invalid WebP Base64 asset: ${file}`);
  }

  await writeFile(outputPath, image);
  console.log(`Generated public/images/${outputName} (${image.length} bytes)`);
}
