import localFont from "next/font/local";

/**
 * Cormorant Garamond + Archivo, self-hosted from the mock's own files (`pnpm extract` →
 * design/maquette/fonts/, latin + latin-ext copied here: French needs nothing else).
 *
 * They were `Cormorant_Garamond` / `Archivo` from next/font/google until 2026-09-30. Google
 * Fonts sometimes answers with extensionless `/l/font?kit=` URLs (≈ 1 response in 60) and the
 * Turbopack build then fails with « next/font/google queries have exactly one entry »
 * (vercel/next.js#99114, open) — seen on this repo's CI the same day. Every Pages CMS save is a
 * Vercel build: a random font failure would refuse one of Camille's edits.
 *
 * `localFont` has no unicode-range option: one call per subset, the range as a declaration
 * (several same-style files in one `src` would let the last one win and drop glyphs). The
 * latin-ext face comes first in the stack (globals.css) and carries no generated fallback, so
 * the adjusted fallback of the latin face stays the last resort. Font loader options must be
 * written literals (Next refuses constants): the two ranges are repeated in each call.
 */

export const archivoLatin = localFont({
  src: [
    {
      path: "./fonts/archivo-normal-latin.woff2",
      weight: "300 600",
      style: "normal",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  display: "swap",
  adjustFontFallback: "Arial",
  variable: "--font-archivo-latin",
});

export const archivoLatinExt = localFont({
  src: [
    {
      path: "./fonts/archivo-normal-latin-ext.woff2",
      weight: "300 600",
      style: "normal",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-archivo-latin-ext",
});

export const cormorantLatin = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-normal-latin.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-italic-latin.woff2",
      weight: "400 500",
      style: "italic",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-cormorant-latin",
});

export const cormorantLatinExt = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-normal-latin-ext.woff2",
      weight: "400 600",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-italic-latin-ext.woff2",
      weight: "400 500",
      style: "italic",
    },
  ],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  variable: "--font-cormorant-latin-ext",
});

/** The four CSS variables, set on <html>. */
export const fontVariables = [
  archivoLatin,
  archivoLatinExt,
  cormorantLatin,
  cormorantLatinExt,
]
  .map((font) => font.variable)
  .join(" ");
