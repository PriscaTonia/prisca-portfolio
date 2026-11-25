#!/usr/bin/env node
/**
 * List a Cloudinary folder and print ready-to-paste `cover` / `gallery`
 * entries for data/projects.ts.
 *
 *   npm run images "Prisca - Portfolio Project Images/NMDB"
 *   npm run images "Prisca - Portfolio Project Images/NMDB" -- --json
 *
 * Name uploads cover, 01, 02, 03 … so the order is predictable. Reads
 * NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and
 * CLOUDINARY_API_SECRET from .env.local (or the environment).
 */
import { readFileSync, existsSync } from "node:fs";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const folder = process.argv[2];
const asJson = process.argv.includes("--json");
const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const key = process.env.CLOUDINARY_API_KEY;
const secret = process.env.CLOUDINARY_API_SECRET;

if (!folder) {
  console.error('Usage: npm run images "<Cloudinary folder>"');
  process.exit(1);
}
if (!cloud || !key || !secret) {
  console.error("Missing Cloudinary credentials (see .env.local).");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
const resources = [];
let cursor;
do {
  const url = new URL(`https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload`);
  url.searchParams.set("prefix", folder.endsWith("/") ? folder : `${folder}/`);
  url.searchParams.set("max_results", "500");
  if (cursor) url.searchParams.set("next_cursor", cursor);
  const res = await fetch(url, { headers: { Authorization: auth } });
  if (!res.ok) {
    console.error(`Cloudinary responded ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const body = await res.json();
  resources.push(...body.resources);
  cursor = body.next_cursor;
} while (cursor);

// Natural sort on the file name so 2 comes before 10; "cover" first.
const name = (r) => r.public_id.split("/").pop();
resources.sort((a, b) => {
  const ac = /^cover/i.test(name(a)), bc = /^cover/i.test(name(b));
  if (ac !== bc) return ac ? -1 : 1;
  return name(a).localeCompare(name(b), undefined, { numeric: true });
});

const rows = resources.map((r) => ({
  name: name(r),
  src: r.secure_url,
  width: r.width,
  height: r.height,
}));

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}

if (!rows.length) {
  console.log(`No images found in "${folder}".`);
  process.exit(0);
}

const entry = (r, indent) =>
  `${indent}{\n${indent}  src: "${r.src}",\n${indent}  alt: "TODO: what's on screen",\n${indent}  caption: "TODO: what it shows",\n${indent}  width: ${r.width},\n${indent}  height: ${r.height},\n${indent}},`;

const [cover, ...rest] = rows;
console.log(`// ${rows.length} image(s) in "${folder}"\n`);
console.log(`cover: ${entry(cover, "").replace(/,$/, "")},`);
if (rest.length) {
  console.log("gallery: [");
  for (const r of rest.slice(0, 3)) console.log(entry(r, "  "));
  console.log("],");
  if (rest.length > 3) console.log(`// ${rest.length - 3} more not included (the page shows 3).`);
}
