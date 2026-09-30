import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { assertContent } from "./content";

/**
 * The content files are what Camille edits in Pages CMS. Prices are checked against the
 * charte (§10-§15) and her written answer Q1 of 2026-09-20 (« Photothérapie par lumière LED »,
 * the 160 € formula): the charte wins over any other source.
 */
const CONTENT = join(__dirname, "..", "content");
const readJson = (path: string) =>
  JSON.parse(readFileSync(join(CONTENT, path), "utf8"));

const PRESTATIONS = [
  "electrolyse",
  "soins-visage",
  "cils",
  "sourcils",
  "blanchiment-dentaire",
];

type Tarif = { label: string; detail?: string | null; prix: number };
const priceTable = (name: string): [string, number][] =>
  (readJson(`prestations/${name}.json`).tarifs as Tarif[]).map((t) => [
    t.label,
    t.prix,
  ]);

function allContentFiles(dir = CONTENT): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? allContentFiles(join(dir, e.name)) : [join(dir, e.name)],
  );
}

describe("content files — prestations (a, b, c)", () => {
  it.each(PRESTATIONS)(
    "%s.json exists, parses and passes the runtime validator",
    (name) => {
      const value = readJson(`prestations/${name}.json`);
      expect(() =>
        assertContent(`prestations/${name}.json`, value),
      ).not.toThrow();
    },
  );

  it("électrolyse: the 8 lines of the charte and the 45 € bilan", () => {
    expect(priceTable("electrolyse")).toEqual([
      ["10 min", 32],
      ["15 min", 45],
      ["20 min", 53],
      ["30 min", 70],
      ["35 min", 82],
      ["45 min", 98],
      ["50 min", 108],
      ["60 min", 115],
    ]);
    expect(readJson("prestations/electrolyse.json").bilan.prix).toBe(45);
  });

  it("cils: 55 / 65", () => {
    expect(priceTable("cils").map(([, p]) => p)).toEqual([55, 65]);
  });

  it("sourcils: 18 / 18 / 30 / 60 / 73", () => {
    expect(priceTable("sourcils").map(([, p]) => p)).toEqual([
      18, 18, 30, 60, 73,
    ]);
  });

  it("blanchiment dentaire: 110 / 60", () => {
    expect(priceTable("blanchiment-dentaire").map(([, p]) => p)).toEqual([
      110, 60,
    ]);
  });

  it("soins visage: the founder's nomenclature, 90 / 90 / 160 (Q1)", () => {
    expect(priceTable("soins-visage")).toEqual([
      ["Microneedling + Photothérapie par lumière LED", 90],
      ["BBglow + Photothérapie par lumière LED", 90],
      ["Microneedling + BBglow + Photothérapie par lumière LED", 160],
    ]);
  });

  it("every prix is a finite number >= 0", () => {
    for (const name of PRESTATIONS) {
      const data = readJson(`prestations/${name}.json`);
      const prices = [...(data.tarifs as Tarif[]).map((t) => t.prix)];
      if (data.bilan) prices.push(data.bilan.prix);
      for (const p of prices) {
        expect(typeof p, `${name}: ${p}`).toBe("number");
        expect(Number.isFinite(p) && p >= 0, `${name}: ${p}`).toBe(true);
      }
    }
  });
});

describe("content files — forbidden strings (d)", () => {
  const files = () => allContentFiles().filter((f) => /\.(json|md)$/.test(f));

  it.each(["Baby Glow", "Facebook", "Onglartiste"])(
    "no content file contains « %s »",
    (needle) => {
      const hits = files().filter((f) =>
        readFileSync(f, "utf8").includes(needle),
      );
      expect(hits).toEqual([]);
    },
  );

  it("the legal email appears in legal/mentions-legales.md only", () => {
    const hits = files()
      .filter((f) =>
        readFileSync(f, "utf8").includes("camilledesousasantos@gmail.com"),
      )
      .map((f) => f.slice(CONTENT.length + 1));
    expect(hits).toEqual(["legal/mentions-legales.md"]);
  });
});

describe("content files — home and journal (e, f)", () => {
  it("accueil.json has exactly 6 instagram photos", () => {
    const accueil = readJson("pages/accueil.json");
    expect(accueil.instagram.photos).toHaveLength(6);
    expect(() => assertContent("pages/accueil.json", accueil)).not.toThrow();
  });

  it("every journal article is a draft at launch (published: false)", () => {
    const dir = join(CONTENT, "journal");
    const articles = readdirSync(dir).filter((f) => f.endsWith(".md"));
    expect(articles.length).toBeGreaterThan(0);
    for (const f of articles) {
      expect(matter(readFileSync(join(dir, f), "utf8")).data.published, f).toBe(
        false,
      );
    }
  });

  it.each([
    "site.json",
    "pages/prestations.json",
    "pages/institut.json",
    "pages/cheques-cadeaux.json",
    "pages/formations.json",
    "pages/journal.json",
  ])("%s passes the runtime validator", (file) => {
    expect(() => assertContent(file, readJson(file))).not.toThrow();
  });
});

describe("assertContent — required vs optional (d2)", () => {
  const OPTIONAL = [
    "imagePosition",
    "proof",
    "proofCaption",
    "quoi2",
    "zones",
    "blocs",
    "options",
    "bilan",
    "tarifsNote",
    "precautionsIntro",
    "footnote",
    "apres",
  ];
  const base = () => readJson("prestations/electrolyse.json");

  it.each(
    OPTIONAL.flatMap((key) =>
      [null, "", []].map((empty) => [key, empty] as const),
    ),
  )("optional %s set to %j is accepted as absent", (key, empty) => {
    const value = { ...base(), [key]: empty };
    expect(() =>
      assertContent("prestations/electrolyse.json", value),
    ).not.toThrow();
  });

  it("an optional tarif detail may be cleared", () => {
    const value = base();
    value.tarifs[0].detail = "";
    value.tarifs[1].detail = null;
    expect(() =>
      assertContent("prestations/electrolyse.json", value),
    ).not.toThrow();
  });

  it("a missing required key throws with the file and the key", () => {
    const value = base();
    delete value.h1;
    expect(() => assertContent("prestations/electrolyse.json", value)).toThrow(
      /content\/prestations\/electrolyse\.json: h1/,
    );
  });

  it("a non-numeric prix throws with the file and the key", () => {
    const value = base();
    value.tarifs[2].prix = "53 €";
    expect(() => assertContent("prestations/electrolyse.json", value)).toThrow(
      /content\/prestations\/electrolyse\.json: tarifs\[2\]\.prix/,
    );
  });

  it("a negative prix throws", () => {
    const value = base();
    value.bilan.prix = -1;
    expect(() => assertContent("prestations/electrolyse.json", value)).toThrow(
      /bilan\.prix/,
    );
  });

  it("the home tolerates 1 to 6 instagram photos but never 0", () => {
    const accueil = readJson("pages/accueil.json");
    accueil.instagram.photos = accueil.instagram.photos.slice(0, 2);
    expect(() => assertContent("pages/accueil.json", accueil)).not.toThrow();
    accueil.instagram.photos = [];
    expect(() => assertContent("pages/accueil.json", accueil)).toThrow(
      /instagram\.photos/,
    );
  });
});
