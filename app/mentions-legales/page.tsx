import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { getLegal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Beauty Green Institut : éditeur, hébergeur, propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  const page = getLegal("mentions-legales");
  return (
    <LegalPage title={page.title} updated={page.updated} body={page.body} />
  );
}
