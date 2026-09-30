import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaFinal } from "@/components/cta-final";
import { SectionLabel } from "@/components/section-label";
import { UniverseCard } from "@/components/universe-card";
import { getPage, getPrestations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Prestations à Rouen",
  description:
    "Électrolyse, soins visage, rehaussement de cils, sourcils et blanchiment dentaire à Rouen : chaque univers a sa page, avec son déroulement, ses tarifs et ses précautions.",
};

/** `PrestationsIndex` of the mock: the five universes, all of the same rank. */
export default function PrestationsPage() {
  const page = getPage("prestations");
  const prestations = getPrestations();
  return (
    <>
      <section className="pt-9 lg:pt-28">
        <Container>
          <SectionLabel className="mb-4 lg:mb-6">{page.label}</SectionLabel>
          <h1 className="max-w-[16ch] text-h1-m lg:text-h1">{page.h1}</h1>
          <p className="mt-[18px] max-w-[54ch] font-serif text-lede-m font-medium text-brun-80 lg:mt-[26px] lg:text-lede">
            {page.lede}
          </p>
        </Container>
      </section>
      <section className="py-12 lg:py-24">
        <Container>
          <div className="grid gap-11 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-y-16">
            {prestations.map((p) => (
              <UniverseCard
                key={p.key}
                href={p.href}
                index={String(p.ordre).padStart(2, "0")}
                title={p.titre}
                line={p.ligne}
                image={p.imageCarte}
                sizes="(min-width: 1024px) 373px, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </Container>
      </section>
      <CtaFinal
        title="Prendre rendez-vous"
        line="Réservation en ligne sur Planity."
      />
    </>
  );
}
