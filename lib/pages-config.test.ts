import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

/**
 * `.pages.yml` is the editor Camille uses (Pages CMS). With `merge: true` a save keeps the
 * undeclared TOP-LEVEL keys only: a list edited in the editor replaces the whole list, so a key
 * of a list item or a nested object that is not declared is dropped at the first save. Every key
 * the site reads must therefore be declared, down to the list items.
 */
const ROOT = join(__dirname, "..");
const CONTENT = join(ROOT, "content");

interface Field {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  hidden?: boolean;
  description?: string;
  list?: boolean | { min?: number; max?: number };
  options?: Record<string, unknown>;
  fields?: Field[];
}
interface Entry {
  name: string;
  type: "file" | "collection";
  path: string;
  format: string;
  fields: Field[];
  operations?: Record<string, boolean>;
  view?: Record<string, unknown>;
  filename?: string;
}

const config = parse(readFileSync(join(ROOT, ".pages.yml"), "utf8")) ?? {};
const entries: Entry[] = config.content ?? [];
const entry = (name: string) => {
  const found = entries.find((e) => e.name === name);
  if (!found) throw new Error(`.pages.yml: no content entry named ${name}`);
  return found;
};

/** Declared key paths of an entry: `tarifs.prix`, `bilan.titre`, `hero.image`… */
function declared(fields: Field[], prefix = ""): string[] {
  return fields.flatMap((f) => {
    const path = prefix ? `${prefix}.${f.name}` : f.name;
    return [path, ...(f.fields ? declared(f.fields, path) : [])];
  });
}
const field = (fields: Field[], path: string): Field => {
  const [head, ...rest] = path.split(".");
  const found = fields.find((f) => f.name === head);
  if (!found) throw new Error(`field ${path} not declared`);
  return rest.length ? field(found.fields ?? [], rest.join(".")) : found;
};

/** Key paths present in a content value, list items flattened (`tarifs.prix`, not `tarifs.0.prix`). */
function present(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value))
    return value.flatMap((item) => present(item, prefix));
  if (value === null || typeof value !== "object" || value instanceof Date)
    return [];
  return Object.entries(value).flatMap(([key, v]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return [path, ...present(v, path)];
  });
}

const json = (file: string) =>
  JSON.parse(readFileSync(join(CONTENT, file), "utf8"));
const markdown = (file: string) => {
  const { data } = matter(readFileSync(join(CONTENT, file), "utf8"));
  return { ...data, body: "" };
};
const filesIn = (dir: string, ext: string) =>
  readdirSync(join(CONTENT, dir))
    .filter((f) => f.endsWith(ext))
    .map((f) => `${dir}/${f}`);

/** Every content file of the site and the entry that edits it. */
const FILES: [string, string, () => unknown][] = [
  ["site.json", "site", () => json("site.json")],
  ["pages/accueil.json", "accueil", () => json("pages/accueil.json")],
  [
    "pages/prestations.json",
    "prestations-page",
    () => json("pages/prestations.json"),
  ],
  ["pages/institut.json", "institut", () => json("pages/institut.json")],
  [
    "pages/cheques-cadeaux.json",
    "cheques-cadeaux",
    () => json("pages/cheques-cadeaux.json"),
  ],
  ["pages/formations.json", "formations", () => json("pages/formations.json")],
  ["pages/journal.json", "journal-page", () => json("pages/journal.json")],
  ...filesIn("prestations", ".json").map(
    (f) => [f, "prestations", () => json(f)] as [string, string, () => unknown],
  ),
  ...filesIn("legal", ".md").map(
    (f) => [f, "legal", () => markdown(f)] as [string, string, () => unknown],
  ),
  ...filesIn("journal", ".md").map(
    (f) => [f, "journal", () => markdown(f)] as [string, string, () => unknown],
  ),
];

/** The content model of a prestation (plan beauty-green-site-v1, Phase A), optional keys included. */
const PRESTATION_MODEL = [
  "ordre",
  "titre",
  "ligne",
  "imageCarte",
  "label",
  "h1",
  "accroche",
  "image",
  "imagePosition",
  "proof",
  "proofCaption",
  "quoi",
  "quoi2",
  "zones",
  "blocs.t",
  "blocs.d",
  "options.t",
  "options.d",
  "bilan.titre",
  "bilan.texte",
  "bilan.prix",
  "bilan.mention",
  "tarifsTitre",
  "tarifsNote",
  "tarifs.label",
  "tarifs.detail",
  "tarifs.prix",
  "precautionsIntro",
  "precautions",
  "footnote",
  "apres",
  "faq.q",
  "faq.a",
  "seoTitle",
  "seoDescription",
];

describe(".pages.yml — settings and media", () => {
  it("merges saves into the existing file", () => {
    expect(config.settings?.content?.merge).toBe(true);
  });

  it("stores uploads in public/images, served at /images", () => {
    expect(config.media).toMatchObject({
      input: "public/images",
      output: "/images",
    });
  });
});

describe(".pages.yml — every key the site reads is declared, list items included", () => {
  it.each(FILES.map(([file, name, read]) => [file, name, read] as const))(
    "%s (entry %s)",
    (_file, name, read) => {
      const keys = declared(entry(name).fields);
      const missing = [...new Set(present(read()))].filter(
        (k) => !keys.includes(k),
      );
      expect(missing).toEqual([]);
    },
  );

  it("the prestation model is declared in full, optional keys included", () => {
    const keys = declared(entry("prestations").fields);
    expect(PRESTATION_MODEL.filter((k) => !keys.includes(k))).toEqual([]);
  });
});

describe(".pages.yml — prices and photos (US-13, US-11)", () => {
  it("every tarif price is a number >= 0", () => {
    const { fields } = entry("prestations");
    for (const path of ["tarifs.prix", "bilan.prix"]) {
      expect(field(fields, path).type, path).toBe("number");
      expect(field(fields, path).options?.min, path).toBe(0);
    }
    expect(field(fields, "tarifs").list).toBeTruthy();
  });

  it("the home carries exactly 6 Instagram images", () => {
    const photos = field(entry("accueil").fields, "instagram.photos");
    expect(photos.type).toBe("image");
    expect(photos.list).toMatchObject({ min: 6, max: 6 });
  });

  it("every image field tells Camille the size to upload", () => {
    const images = (fields: Field[]): Field[] =>
      fields.flatMap((f) => [
        ...(f.type === "image" ? [f] : []),
        ...images(f.fields ?? []),
      ]);
    const all = entries.flatMap((e) => images(e.fields));
    expect(all.length).toBeGreaterThan(0);
    for (const f of all) expect(f.description, f.name).toMatch(/1600 px/);
  });
});

describe(".pages.yml — what Camille cannot break", () => {
  it("layout-level keys are hidden", () => {
    const { fields } = entry("prestations");
    for (const name of [
      "ordre",
      "imagePosition",
      "seoTitle",
      "seoDescription",
    ]) {
      expect(field(fields, name).hidden, name).toBe(true);
    }
  });

  it.each(["prestations", "legal"])(
    "the %s collection is fixed (no create, delete or rename)",
    (name) => {
      expect(entry(name).operations).toEqual({
        create: false,
        delete: false,
        rename: false,
      });
    },
  );

  it("journal articles: category among the 5 universes, published switch, markdown body", () => {
    const { fields, format, path } = entry("journal");
    expect({ format, path }).toEqual({
      format: "yaml-frontmatter",
      path: "content/journal",
    });
    expect(field(fields, "category").options?.values).toEqual([
      "Électrolyse",
      "Soins visage",
      "Cils",
      "Sourcils",
      "Blanchiment dentaire",
    ]);
    expect(field(fields, "published").type).toBe("boolean");
    expect(field(fields, "body")).toMatchObject({
      type: "rich-text",
      options: { format: "markdown" },
    });
  });
});
