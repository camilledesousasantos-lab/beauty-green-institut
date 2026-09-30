/**
 * Content model of the site — every text, price, hour and photo Camille edits in Pages CMS
 * (`.pages.yml` declares the same keys). Server-only: read at build time with node:fs, never
 * import this module from a client component (pass the data down as props).
 *
 * Every reader goes through `assertContent`: a bad save in Pages CMS (a cleared title, a price
 * typed as text) fails the Vercel build loudly with the file and the key — the previous
 * deployment stays live — instead of rendering `undefined` on the site.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export const CONTENT_DIR = join(process.cwd(), "content");

// ── Types ────────────────────────────────────────────────────────────────────────────────

export interface Site {
  nom: string;
  planity: string;
  instagram: { handle: string; url: string };
  tel: string;
  telHref: string;
  adresse: { rue: string; cp: string; ville: string };
  /** Three short lines (footer, practical blocks). */
  horaires: string[];
  /** The same hours on one line (final CTA). */
  horairesLigne: string;
}

export interface Accueil {
  label: string;
  titre: string;
  accroche: string;
  intro: string;
  hero: { image: string; alt: string };
  institut: { titre: string; texte: string };
  instagram: { titre: string; photos: string[] };
}

export interface Bloc {
  t: string;
  d: string;
}

export interface Tarif {
  label: string;
  detail?: string;
  prix: number;
}

export interface Prestation {
  ordre: number;
  titre: string;
  ligne: string;
  imageCarte: string;
  label: string;
  h1: string;
  accroche: string;
  image: string;
  imagePosition?: string;
  proof?: string;
  proofCaption?: string;
  quoi: string;
  quoi2?: string;
  zones?: string[];
  blocs?: Bloc[];
  options?: Bloc[];
  bilan?: { titre: string; texte: string; prix: number; mention: string };
  tarifsTitre: string;
  tarifsNote?: string;
  tarifs: Tarif[];
  precautionsIntro?: string;
  precautions: string[];
  footnote?: string;
  apres?: string[];
  faq: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
}

export interface PrestationsPage {
  label: string;
  h1: string;
  lede: string;
}

export interface InstitutPage {
  label: string;
  h1: string;
  texte: string[];
  signature: string;
  valeurs: string[];
  portrait: string;
  /** [header photo, gallery photo 1, gallery photo 2] */
  photos: string[];
}

export interface ChequesCadeauxPage {
  label: string;
  h1: string;
  intro: string;
  montants: string[];
  note: string;
  commanderTitre: string;
  commanderTexte: string;
  bientot: string;
}

export interface FormationsPage {
  label: string;
  h1: string;
  statut: string;
  intro: string;
  apreparer: string[];
  contact: string;
  note: string;
}

export interface JournalPage {
  titre: string;
  vide: string;
  categories: string[];
}

export interface Pages {
  accueil: Accueil;
  prestations: PrestationsPage;
  institut: InstitutPage;
  "cheques-cadeaux": ChequesCadeauxPage;
  formations: FormationsPage;
  journal: JournalPage;
}

export interface LegalPage {
  title: string;
  /** YYYY-MM-DD */
  updated: string;
  body: string;
}

export interface Article {
  title: string;
  /** YYYY-MM-DD */
  date: string;
  category: string;
  image: string;
  chapo: string;
  published: boolean;
  body: string;
}

// ── Runtime validator (dependency-free) ────────────────────────────────────────────────────

class KeyError extends Error {
  constructor(
    readonly key: string,
    message: string,
  ) {
    super(message);
  }
}

type Check = (value: unknown, key: string) => unknown;

/** Pages CMS writes a cleared optional field as `null`, `""` or `[]`. */
const isAbsent = (v: unknown) =>
  v === undefined ||
  v === null ||
  v === "" ||
  (Array.isArray(v) && v.length === 0);

const text: Check = (v, key) => {
  if (typeof v !== "string")
    throw new KeyError(key, `must be text, got ${typeof v}`);
  return v;
};

const price: Check = (v, key) => {
  if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
    throw new KeyError(key, `must be a number >= 0, got ${JSON.stringify(v)}`);
  }
  return v;
};

const int: Check = (v, key) => {
  if (typeof v !== "number" || !Number.isInteger(v)) {
    throw new KeyError(key, `must be an integer, got ${JSON.stringify(v)}`);
  }
  return v;
};

const bool: Check = (v, key) => {
  if (typeof v !== "boolean")
    throw new KeyError(key, `must be true or false, got ${JSON.stringify(v)}`);
  return v;
};

/** YAML parses an unquoted 2026-09-30 as a Date: accept both, keep YYYY-MM-DD. */
const date: Check = (v, key) => {
  if (v instanceof Date && !Number.isNaN(v.getTime()))
    return v.toISOString().slice(0, 10);
  if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v))
    return v.slice(0, 10);
  throw new KeyError(
    key,
    `must be a date YYYY-MM-DD, got ${JSON.stringify(v)}`,
  );
};

const list =
  (item: Check, { min = 1, max = Number.POSITIVE_INFINITY } = {}): Check =>
  (v, key) => {
    if (!Array.isArray(v)) throw new KeyError(key, "must be a list");
    if (v.length < min || v.length > max) {
      throw new KeyError(
        key,
        `must have ${min}..${max === Number.POSITIVE_INFINITY ? "n" : max} items, got ${v.length}`,
      );
    }
    return v.map((x, i) => item(x, `${key}[${i}]`));
  };

/** Keys ending with `?` are optional: absent, null, "" and [] are dropped from the result. */
const object =
  (shape: Record<string, Check>): Check =>
  (v, key) => {
    if (typeof v !== "object" || v === null || Array.isArray(v)) {
      throw new KeyError(key, "must be an object");
    }
    const source = v as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [rawName, check] of Object.entries(shape)) {
      const optional = rawName.endsWith("?");
      const name = optional ? rawName.slice(0, -1) : rawName;
      const path = key ? `${key}.${name}` : name;
      if (isAbsent(source[name])) {
        if (optional) continue;
        throw new KeyError(path, "is required");
      }
      out[name] = check(source[name], path);
    }
    return out;
  };

const bloc = object({ t: text, d: text });

const SCHEMAS = {
  site: object({
    nom: text,
    planity: text,
    instagram: object({ handle: text, url: text }),
    tel: text,
    telHref: text,
    adresse: object({ rue: text, cp: text, ville: text }),
    horaires: list(text),
    horairesLigne: text,
  }),
  accueil: object({
    label: text,
    titre: text,
    accroche: text,
    intro: text,
    hero: object({ image: text, alt: text }),
    institut: object({ titre: text, texte: text }),
    // The editor enforces exactly 6; the site renders what exists so a removed photo never
    // freezes a deployment.
    instagram: object({ titre: text, photos: list(text, { min: 1, max: 6 }) }),
  }),
  prestations: object({ label: text, h1: text, lede: text }),
  prestation: object({
    ordre: int,
    titre: text,
    ligne: text,
    imageCarte: text,
    label: text,
    h1: text,
    accroche: text,
    image: text,
    "imagePosition?": text,
    "proof?": text,
    "proofCaption?": text,
    quoi: text,
    "quoi2?": text,
    "zones?": list(text),
    "blocs?": list(bloc),
    "options?": list(bloc),
    "bilan?": object({ titre: text, texte: text, prix: price, mention: text }),
    tarifsTitre: text,
    "tarifsNote?": text,
    tarifs: list(object({ label: text, "detail?": text, prix: price })),
    "precautionsIntro?": text,
    precautions: list(text),
    "footnote?": text,
    "apres?": list(text),
    faq: list(object({ q: text, a: text })),
    seoTitle: text,
    seoDescription: text,
  }),
  institut: object({
    label: text,
    h1: text,
    texte: list(text),
    signature: text,
    valeurs: list(text),
    portrait: text,
    photos: list(text, { min: 3, max: 3 }),
  }),
  "cheques-cadeaux": object({
    label: text,
    h1: text,
    intro: text,
    montants: list(text),
    note: text,
    commanderTitre: text,
    commanderTexte: text,
    bientot: text,
  }),
  formations: object({
    label: text,
    h1: text,
    statut: text,
    intro: text,
    apreparer: list(text),
    contact: text,
    note: text,
  }),
  journal: object({ titre: text, vide: text, categories: list(text) }),
  legal: object({ title: text, updated: date, body: text }),
  article: object({
    title: text,
    date,
    category: text,
    image: text,
    chapo: text,
    published: bool,
    body: text,
  }),
} satisfies Record<string, Check>;

function schemaFor(file: string): Check {
  if (file === "site.json") return SCHEMAS.site;
  if (file.startsWith("prestations/") && file.endsWith(".json"))
    return SCHEMAS.prestation;
  if (file.startsWith("legal/") && file.endsWith(".md")) return SCHEMAS.legal;
  if (file.startsWith("journal/") && file.endsWith(".md"))
    return SCHEMAS.article;
  const page = file.match(/^pages\/(.+)\.json$/)?.[1];
  if (page && page in SCHEMAS) return SCHEMAS[page as keyof typeof SCHEMAS];
  throw new Error(`content/${file}: no schema for this file`);
}

/**
 * Validates one content file (path relative to `content/`) and returns it with the absent
 * optional keys removed. Throws `Error("content/<file>: <key> …")`.
 */
export function assertContent(file: string, value: unknown): unknown {
  try {
    return schemaFor(file)(value, "");
  } catch (error) {
    if (error instanceof KeyError) {
      throw new Error(
        `content/${file}: ${error.key || "(root)"} ${error.message}`,
      );
    }
    throw error;
  }
}

// ── Readers ──────────────────────────────────────────────────────────────────────────────

const readJson = (file: string): unknown =>
  assertContent(
    file,
    JSON.parse(readFileSync(join(CONTENT_DIR, file), "utf8")),
  );

/** Reads a frontmatter file into `{ ...frontmatter, body }`, validated. */
export function readMarkdown(file: string): unknown {
  const { data, content } = matter(
    readFileSync(join(CONTENT_DIR, file), "utf8"),
  );
  return assertContent(file, { ...data, body: content.trim() });
}

export const getSite = () => readJson("site.json") as Site;

export const getPage = <K extends keyof Pages>(name: K) =>
  readJson(`pages/${name}.json`) as Pages[K];

/**
 * The five universes: content file name ↔ public route. Single source for
 * `generateStaticParams`, the sitemap and the home cards. The order of the site is `ordre`.
 */
export const PRESTATION_SLUGS = {
  electrolyse: "electrolyse-rouen",
  "soins-visage": "soins-visage-rouen",
  cils: "cils-rouen",
  sourcils: "sourcils-rouen",
  "blanchiment-dentaire": "blanchiment-dentaire-rouen",
} as const;

export type PrestationKey = keyof typeof PRESTATION_SLUGS;
export type PrestationWithSlug = Prestation & {
  key: PrestationKey;
  slug: string;
  href: string;
};

export function getPrestations(): PrestationWithSlug[] {
  return (Object.entries(PRESTATION_SLUGS) as [PrestationKey, string][])
    .map(([key, slug]) => ({
      ...(readJson(`prestations/${key}.json`) as Prestation),
      key,
      slug,
      href: `/prestations/${slug}`,
    }))
    .sort((a, b) => a.ordre - b.ordre);
}

export const getPrestation = (slug: string) =>
  getPrestations().find((p) => p.slug === slug);

export const getLegal = (name: "mentions-legales" | "confidentialite") =>
  readMarkdown(`legal/${name}.md`) as LegalPage;

/** `32` → `32 €` with the narrow no-break space French typography uses before the sign. */
export const formatPrix = (prix: number) => `${prix} €`;
