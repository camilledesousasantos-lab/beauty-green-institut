import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";
import { getPage, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Chèques cadeaux",
  description:
    "Offrir un moment pour soi : le chèque cadeau Beauty Green Institut, valable un an sur toutes les prestations, s'obtient à l'institut ou par téléphone.",
};

/**
 * `CadeauxPage` of the mock, v1: an information page (vouchers at the institute or by phone).
 * The online purchase comes with v2: no purchase button here.
 */
export default function ChequesCadeauxPage() {
  const page = getPage("cheques-cadeaux");
  const site = getSite();
  return (
    <>
      <section className="pt-9 lg:pt-28">
        <Container>
          <SectionLabel className="mb-4 lg:mb-6">{page.label}</SectionLabel>
          <h1 className="text-h1-m lg:max-w-[14ch] lg:text-h1">{page.h1}</h1>
          <p className="mt-[18px] max-w-[54ch] font-serif text-lede-m font-medium text-brun-80 lg:mt-7 lg:text-lede">
            {page.intro}
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionLabel className="mb-[22px]">Montants</SectionLabel>
            <ul className="flex flex-wrap gap-3">
              {page.montants.map((montant) => (
                <li
                  key={montant}
                  className="border border-brun-30 px-[22px] py-3 font-sans text-price leading-[1.65] text-brun lg:px-[26px] lg:py-3.5"
                >
                  {montant}
                </li>
              ))}
            </ul>
            <p className="mt-7 max-w-[42ch] font-sans text-body-sm text-brun-60">
              {page.note}
            </p>
          </div>
          <div className="bg-beige px-6 py-9 lg:p-14">
            <h2 className="mb-[18px] text-[27px] leading-[1.15] font-medium lg:text-[33px]">
              {page.commanderTitre}
            </h2>
            <p className="max-w-[38ch] font-sans text-body text-brun-80">
              {page.commanderTexte}
            </p>
            <div className="mt-8">
              <Button href={site.telHref}>Appeler l'institut</Button>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <div className="mb-16 flex flex-col gap-3 border border-dashed border-brun-30 px-6 py-8 lg:mb-[120px] lg:px-12 lg:py-11">
            <SectionLabel>Bientôt en ligne</SectionLabel>
            <p className="max-w-[40ch] font-serif text-[21px] leading-[1.4] font-medium text-brun lg:text-[26px]">
              {page.bientot}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
