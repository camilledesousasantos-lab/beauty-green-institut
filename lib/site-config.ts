/**
 * Single source of truth for site-wide identity, contact info and canonical URL.
 * Every value comes from the client's brand charter (2026-09) and her written
 * answers of 2026-09-20. The charter wins over the old Wix site when they differ.
 */
export const siteConfig = {
  name: "Beauty Green Institut",
  tagline: "Institut de beauté à Rouen",
  claim: "La beauté comme un moment pour soi.",
  // Provisional Vercel URL until the domain beautygreeninstitut.com is switched over.
  url: "https://beauty-green-institut.vercel.app",
  booking: {
    label: "Prendre rendez-vous",
    // One general Planity page for every button (client decision, Q4).
    href: "https://www.planity.com/beauty-green-x-onglartiste-76000-rouen",
  },
  contact: {
    phone: "07 86 66 87 99",
    phoneHref: "tel:+33786668799",
    address: {
      street: "8 rue Anatole France",
      postalCode: "76000",
      city: "Rouen",
      country: "FR",
    },
    // Charter §25. The old site also listed Saturday mornings: to be confirmed by the client.
    hours: "Du mardi au vendredi, 10h45 à 19h00, sur rendez-vous",
    instagram: {
      handle: "@beautygreeninstitut",
      href: "https://www.instagram.com/beautygreeninstitut",
    },
  },
  legal: {
    // Written answers of 2026-09-20 (Q5).
    companyName: "Beauty Green Institut",
    legalForm: "Entreprise individuelle",
    siret: "877 642 355 00029",
  },
} as const;
