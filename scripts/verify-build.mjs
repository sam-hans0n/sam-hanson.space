import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function* htmlFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

const pngSignature = "89504e470d0a1a0a";
let checked = 0;
for await (const file of htmlFiles("dist")) {
  const html = await readFile(file, "utf8");
  const imageTag = html.match(/<meta\b[^>]*property=["']og:image["'][^>]*>/i)?.[0];
  const imageURL = imageTag?.match(/\bcontent=["']([^"']+)["']/i)?.[1];
  assert.ok(imageURL, `${file}: missing Open Graph image`);
  const url = new URL(imageURL);
  if (url.hostname !== "sam-hanson.space") continue;
  const image = await readFile(join("dist", decodeURIComponent(url.pathname)));
  assert.equal(image.subarray(0, 8).toString("hex"), pngSignature, `${file}: sharing image is not a PNG`);
  checked++;
}
assert.ok(checked > 0, "No local sharing images were checked");
const icon = await readFile("dist/apple-touch-icon.png");
assert.equal(icon.subarray(0, 8).toString("hex"), pngSignature);
assert.equal(icon.readUInt32BE(16), 180);
assert.equal(icon.readUInt32BE(20), 180);
console.log(`Verified sharing images on ${checked} pages and the 180×180 Apple touch icon.`);
