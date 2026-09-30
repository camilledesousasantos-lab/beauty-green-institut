import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getLegal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site Beauty Green Institut : aucune donnée demandée, mesure d'audience sans cookie tiers.",
};

export default function ConfidentialitePage() {
  const page = getLegal("confidentialite");
  return (
    <LegalPage title={page.title} updated={page.updated} body={page.body} />
  );
}
