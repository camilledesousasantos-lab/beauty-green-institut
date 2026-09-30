// Shared data of the story specs: the public routes, the booking link, and the two ways to read a
// page without a browser tab — raw HTML (scripts included: the strictest check) and visible text.
import type { APIRequestContext } from "@playwright/test";

export const PLANITY =
  "https://www.planity.com/beauty-green-x-onglartiste-76000-rouen";
export const INSTAGRAM = "https://www.instagram.com/beautygreeninstitut";
export const LEGAL_EMAIL = "camilledesousasantos@gmail.com";

/** The 13 public routes of v1 (the sitemap lists the same, plus published articles). */
export const ROUTES = [
  "/",
  "/prestations",
  "/prestations/electrolyse-rouen",
  "/prestations/soins-visage-rouen",
  "/prestations/cils-rouen",
  "/prestations/sourcils-rouen",
  "/prestations/blanchiment-dentaire-rouen",
  "/institut",
  "/cheques-cadeaux",
  "/journal",
  "/formations",
  "/mentions-legales",
  "/confidentialite",
] as const;

export async function rawHtml(
  request: APIRequestContext,
  path: string,
): Promise<string> {
  const response = await request.get(path);
  if (response.status() !== 200)
    throw new Error(`${path} answered ${response.status()}`);
  return response.text();
}

/** The text a visitor can read: scripts, styles and tags removed, entities decoded. */
export async function visibleText(
  request: APIRequestContext,
  path: string,
): Promise<string> {
  return (await rawHtml(request, path))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;| /g, " ")
    .replace(/\s+/g, " ");
}
