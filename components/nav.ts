/** The six entries of the main menu (charte §24) — layout, not content. */
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function buildNav(
  prestations: { titre: string; href: string }[],
): NavItem[] {
  return [
    { label: "Accueil", href: "/" },
    {
      label: "Prestations",
      href: "/prestations",
      children: prestations.map((p) => ({ label: p.titre, href: p.href })),
    },
    { label: "L'Institut", href: "/institut" },
    { label: "Chèques cadeaux", href: "/cheques-cadeaux" },
    { label: "Journal", href: "/journal" },
    { label: "Formations", href: "/formations" },
  ];
}

/** `/prestations/cils-rouen` belongs to the « Prestations » entry. */
export const isCurrent = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
