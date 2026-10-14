// Imported by next.config.ts (outside the bundler): no alias imports here.
// /prestations is a real route, not a redirect.
// Wix Bookings service pages and gift-card product pages, matched on ASCII fragments of the slug so the
// percent-encoded (s%C3%A9ance) and decoded (séance) forms both match. The Chou2 accessory products
// (/product-page/chouchou-…, sac-banane-…) are discontinued and stay in 404 on purpose.
const servicePage = (fragment: string, destination: string) => ({
  source: `/service-page/:slug(.*${fragment}.*)`,
  destination,
  permanent: true,
});

export const legacyRedirects = [
  { source: "/reservations", destination: "/prestations", permanent: true },
  {
    source: "/ch-ques-cadeaux",
    destination: "/cheques-cadeaux",
    permanent: true,
  },
  { source: "/chou2", destination: "/", permanent: true },
  { source: "/photographies-1", destination: "/institut", permanent: true },
  servicePage("ance-de-", "/prestations/electrolyse-rouen"),
  servicePage("bbglow", "/prestations/soins-visage-rouen"),
  servicePage("microneedling", "/prestations/soins-visage-rouen"),
  servicePage("hydraface", "/prestations/soins-visage-rouen"),
  servicePage("haussement", "/prestations/cils-rouen"),
  servicePage("sourcil", "/prestations/sourcils-rouen"),
  servicePage("blanchiment", "/prestations/blanchiment-dentaire-rouen"),
  servicePage("grain-de-beaut", "/prestations"),
  {
    source: "/product-page/:slug(cheque-cadeau.*)",
    destination: "/cheques-cadeaux",
    permanent: true,
  },
];
