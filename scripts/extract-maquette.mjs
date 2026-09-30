#!/usr/bin/env node
/**
 * Extracts the two validated Claude Design bundles (public/maquette/{desktop,mobile}.html)
 * into a readable design reference under design/maquette/. The bundles stay untouched: they
 * are what Camille validated (2026-09-21/22) and remain served at /maquette/*.html.
 *
 * Bundle format: <script type="__bundler/manifest"> = JSON {uuid: {mime, compressed, data}}
 * (base64, gzip when compressed); <script type="__bundler/template"> = a JSON-encoded HTML
 * string whose <script src="uuid"> tags point into the manifest. Modules are identified by
 * their content, never by their uuid (uuids change on every re-export).
 *
 * Outputs (all regenerable): manifest.json, tokens.css, fonts.json, content.js,
 * modules/*.jsx, router.jsx, router-mobile.jsx, ds/ (gitignored), fonts/ (gitignored),
 * and the 3 detoured logo inks to public/images/. Photos are never written from the bundle
 * (re-encoded at JPEG 0.72): they come from the hub assets/ folder.
 *
 * Usage: node scripts/extract-maquette.mjs   (no dependency, Node >= 22)
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "design/maquette");
const IMAGES = join(ROOT, "public/images");

/** Page modules of the mock, recognised by their first line. */
const MODULES = [
  ["const DS = window.", "shared"],
  ["function HomeHero(", "home-desktop"],
  ["function InfoBlocs(", "prestation-page"],
  ["function InstitutPage(", "other-pages"],
  ["function JournalPage(", "journal-pages"],
  ["function MobileFrame(", "mobile-screens"],
];

function detectRole(mime, data) {
  if (mime === "font/woff2") return "font";
  const head = data.subarray(0, 200).toString("utf8");
  if (head.startsWith("/* @ds-bundle")) return "design-system";
  const firstLine = head.split("\n")[0];
  for (const [prefix, name] of MODULES) {
    if (firstLine.startsWith(prefix)) return `module:${name}`;
  }
  const text = data.subarray(0, 4000).toString("utf8");
  if (text.includes("window.BG_IMG")) return "images";
  if (text.includes("window.BG =")) return "content";
  if (head.startsWith("!function(e,t)")) return "vendor:babel";
  if (/react-dom/i.test(text)) return "vendor:react-dom";
  if (/react/i.test(text)) return "vendor:react";
  return "unknown";
}

function readBundle(name) {
  const html = readFileSync(
    join(ROOT, "public/maquette", `${name}.html`),
    "utf8",
  );
  const manifestRaw = html.match(
    /<script type="__bundler\/manifest">([\s\S]*?)<\/script>/,
  )?.[1];
  const templateRaw = html.match(
    /<script type="__bundler\/template"[^>]*>([\s\S]*?)<\/script>/,
  )?.[1];
  if (!manifestRaw || !templateRaw) {
    throw new Error(`${name}.html: __bundler manifest or template not found`);
  }
  const template = JSON.parse(templateRaw);
  const entries = Object.entries(JSON.parse(manifestRaw)).map(([uuid, e]) => {
    let data = Buffer.from(e.data, "base64");
    if (e.compressed) data = gunzipSync(data);
    return { uuid, mime: e.mime, data, role: detectRole(e.mime, data) };
  });
  return { name, template, entries };
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

const sha = (buf) =>
  createHash("sha256").update(buf).digest("hex").slice(0, 12);

/** The four `:root{…}` token blocks of the template, verbatim. */
function tokenBlocks(template) {
  const blocks = template.match(/:root\s*\{[\s\S]*?\n\}/g) ?? [];
  if (blocks.length !== 4) {
    throw new Error(
      `expected 4 :root blocks in the template, found ${blocks.length}`,
    );
  }
  return blocks;
}

/** @font-face rules with the subset comment Google Fonts writes above each one. */
function fontFaces(template) {
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g;
  const faces = [];
  for (const m of template.matchAll(re)) {
    const body = m[2];
    const prop = (p) => body.match(new RegExp(`${p}:\\s*([^;]+);`))?.[1].trim();
    faces.push({
      subset: m[1],
      family: prop("font-family")?.replace(/['"]/g, ""),
      style: prop("font-style"),
      weight: prop("font-weight"),
      stretch: prop("font-stretch") ?? null,
      unicodeRange: prop("unicode-range"),
      src: body.match(/url\("([^"]+)"\)/)?.[1],
    });
  }
  return faces;
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function main() {
  const bundles = ["desktop", "mobile"].map(readBundle);
  const [desktop, mobile] = bundles;

  // Generated folders are rebuilt from scratch; README.md (hand-written) is kept.
  for (const dir of ["modules", "ds", "fonts"]) {
    rmSync(join(OUT, dir), { recursive: true, force: true });
  }
  mkdirSync(OUT, { recursive: true });

  // manifest.json — what each bundle carries.
  const manifest = {};
  for (const b of bundles) {
    manifest[b.name] = Object.fromEntries(
      b.entries.map((e) => [
        e.uuid,
        {
          mime: e.mime,
          size: e.data.length,
          role: e.role,
          sha256_12: sha(e.data),
        },
      ]),
    );
    const unknown = b.entries.filter((e) => e.role === "unknown");
    if (unknown.length)
      throw new Error(
        `${b.name}: unidentified entries ${unknown.map((e) => e.uuid)}`,
      );
  }
  write(join(OUT, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  // tokens.css — identical in both templates (checked).
  const tokens = tokenBlocks(desktop.template);
  if (tokens.join("\n") !== tokenBlocks(mobile.template).join("\n")) {
    throw new Error("the :root token blocks differ between desktop and mobile");
  }
  write(
    join(OUT, "tokens.css"),
    `/* Extracted verbatim from public/maquette/desktop.html (identical in mobile.html). */\n\n${tokens.join("\n\n")}\n`,
  );

  // fonts.json + fonts/ (woff2, gitignored — ready-made next/font/local fallback).
  const faces = fontFaces(desktop.template);
  const fontFiles = new Map();
  for (const f of faces) {
    const entry = desktop.entries.find((e) => e.uuid === f.src);
    if (!entry) throw new Error(`font src ${f.src} not in the manifest`);
    const file = `${slug(f.family)}-${f.style}-${f.subset}.woff2`;
    const known = fontFiles.get(file);
    if (known && known !== f.src)
      throw new Error(`two files would be written as ${file}`);
    fontFiles.set(file, f.src);
    f.file = `fonts/${file}`;
  }
  for (const [file, uuid] of fontFiles) {
    write(
      join(OUT, "fonts", file),
      desktop.entries.find((e) => e.uuid === uuid).data,
    );
  }
  const families = {};
  for (const f of faces) {
    families[f.family] ??= {
      weights: new Set(),
      styles: new Set(),
      subsets: new Set(),
    };
    const fam = families[f.family];
    fam.weights.add(f.weight);
    fam.styles.add(f.style);
    fam.subsets.add(f.subset);
  }
  write(
    join(OUT, "fonts.json"),
    `${JSON.stringify(
      {
        families: Object.fromEntries(
          Object.entries(families).map(([k, v]) => [
            k,
            {
              weights: [...v.weights],
              styles: [...v.styles],
              subsets: [...v.subsets],
            },
          ]),
        ),
        woff2Files: fontFiles.size,
        faces: faces.map(({ src, ...rest }) => rest),
      },
      null,
      2,
    )}\n`,
  );

  // content.js — identical in both bundles (checked).
  const content = (b) => b.entries.find((e) => e.role === "content").data;
  if (!content(desktop).equals(content(mobile)))
    throw new Error("content.js differs between bundles");
  write(join(OUT, "content.js"), content(desktop));

  // modules/*.jsx — the page modules as served (patched home of 2026-09-21 included).
  for (const b of bundles) {
    for (const e of b.entries.filter((x) => x.role.startsWith("module:"))) {
      const name = e.role.slice("module:".length);
      const path = join(OUT, "modules", `${name}.jsx`);
      write(path, e.data);
    }
  }

  // router.jsx / router-mobile.jsx — the inline text/babel script of each template.
  for (const b of bundles) {
    const inline = [
      ...b.template.matchAll(
        /<script type="text\/babel">([\s\S]*?)<\/script>/g,
      ),
    ].map((m) => m[1].trim());
    if (!inline.length)
      throw new Error(`${b.name}: no inline text/babel script`);
    write(
      join(OUT, b.name === "desktop" ? "router.jsx" : "router-mobile.jsx"),
      `${inline.join("\n\n")}\n`,
    );
  }

  // ds/ — the design-system bundle split per `// components/…jsx` marker (gitignored).
  const ds = desktop.entries
    .find((e) => e.role === "design-system")
    .data.toString("utf8");
  const markers = [...ds.matchAll(/^\/\/ ((?:components|ui_kits)\/\S+)$/gm)];
  let dsFiles = 0;
  markers.forEach((m, i) => {
    if (!m[1].startsWith("components/")) return;
    const end = i + 1 < markers.length ? markers[i + 1].index : ds.length;
    write(join(OUT, "ds", m[1]), ds.slice(m.index, end));
    dsFiles += 1;
  });

  // Logo inks (transparent PNG, 520 px) — the only images taken from the bundle.
  const images = desktop.entries
    .find((e) => e.role === "images")
    .data.toString("utf8");
  for (const ink of ["brun", "ecru", "vert"]) {
    const b64 = images.match(
      new RegExp(`"logo-${ink}"\\s*:\\s*"data:image/png;base64,([^"]+)"`),
    )?.[1];
    if (!b64) throw new Error(`logo-${ink} not found in images.js`);
    write(
      join(IMAGES, `logo-monogramme-${ink}.png`),
      Buffer.from(b64, "base64"),
    );
  }

  const modules = bundles.flatMap((b) =>
    b.entries.filter((e) => e.role.startsWith("module:")),
  );
  console.log(
    `design/maquette: ${new Set(modules.map((m) => m.role)).size} modules, ${fontFiles.size} woff2, ` +
      `${faces.length} @font-face, ${dsFiles} DS component files, 3 logo inks → public/images/`,
  );
}

main();
