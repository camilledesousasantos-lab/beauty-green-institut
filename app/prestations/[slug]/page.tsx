import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { CtaFinal } from "@/components/cta-final";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHeader } from "@/components/page-header";
import { Photo } from "@/components/photo";
import { PrecautionsBlock } from "@/components/precautions-block";
import { PriceTable } from "@/components/price-table";
import { SectionLabel } from "@/components/section-label";
import { UniversLinks } from "@/components/univers-links";
import {
  type Bloc,
  formatPrix,
  getPrestation,
  getPrestations,
  getSite,
  PRESTATION_SLUGS,
} from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

// The five universes are fixed (layout): any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(PRESTATION_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const prestation = getPrestation((await params).slug);
  if (!prestation) return {};
  return { title: prestation.seoTitle, description: prestation.seoDescription };
}

/** The mock's `InfoBlocs`: titled paragraphs on 2 or 3 columns (one on a phone). */
function InfoBlocs({ items, columns }: { items: Bloc[]; columns: 2 | 3 }) {
  return (
    <div
      className={`grid gap-8 border-t border-brun-14 pt-8 sm:grid-cols-2 lg:gap-10 lg:pt-10 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((bloc) => (
        <div key={bloc.t}>
          <h3 className="mb-3.5 text-[22px] leading-[1.2] font-medium lg:text-[24px]">
            {bloc.t}
          </h3>
          <p className="font-sans text-body-sm text-brun-80">{bloc.d}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * One prestation (`PrestationPage.jsx` at 1440, `ElectrolyseMobile` at 390): what it is, the
 * first appointment, prices, the 24 hours after, precautions, FAQ, booking, other universes.
 */
export default async function PrestationPage({ params }: Props) {
  const prestation = getPrestation((await params).slug);
  if (!prestation) notFound();
  const site = getSite();
  const p = prestation;

  return (
    <>
      <PageHeader
        label={p.label}
        h1={p.h1}
        accroche={p.accroche}
        image={p.image}
        imagePosition={p.imagePosition}
        planity={site.planity}
      />

      {/* Qu'est-ce que c'est */}
      <section className="pt-10 pb-10 lg:py-[120px]">
        <Container className="grid gap-9 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
          <div className="order-2 lg:order-1">
            <SectionLabel className="mb-[18px] hidden lg:block">
              Qu'est-ce que c'est
            </SectionLabel>
            {p.zones ? (
              <div className="lg:mt-9">
                <p className="mb-3 font-sans text-[12px] tracking-[0.06em] text-brun-60 uppercase lg:mb-3.5 lg:text-caption">
                  Zones traitées
                </p>
                <ul className="border-t border-brun-14">
                  {p.zones.map((zone) => (
                    <li
                      key={zone}
                      className="border-b border-brun-14 py-[13px] font-sans text-[15px] lg:py-[11px] lg:text-body-sm"
                    >
                      {zone}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {p.proof ? (
              // Proof photo, never larger than 240 px (CLAUDE.md: not a brand image).
              <figure className="mt-10 max-w-[240px]">
                <Photo src={p.proof} ratio="1 / 1" sizes="240px" />
                {p.proofCaption ? (
                  <figcaption className="mt-3 font-sans text-caption text-brun-60">
                    {p.proofCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
          <div className="order-1 lg:order-2">
            <SectionLabel className="mb-3.5 lg:hidden">
              Qu'est-ce que c'est
            </SectionLabel>
            <p className="max-w-[40ch] font-serif text-[23px] leading-[1.5] font-medium text-brun lg:text-[29px]">
              {p.quoi}
            </p>
            {p.quoi2 ? (
              <p className="mt-5 max-w-[62ch] font-sans text-[15px] leading-[1.7] text-brun-80 lg:mt-8 lg:text-body">
                {p.quoi2}
              </p>
            ) : null}
            {p.options ? (
              <div className="mt-10 lg:mt-12">
                <InfoBlocs items={p.options} columns={3} />
              </div>
            ) : null}
            {p.blocs ? (
              <div className="mt-10 lg:mt-14">
                <InfoBlocs items={p.blocs} columns={2} />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Le premier rendez-vous */}
      {p.bilan ? (
        <section className="border-y border-vert-40 bg-blanc-casse py-9 lg:border-0 lg:py-24">
          <Container>
            <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20 lg:border lg:border-vert-40 lg:p-14">
              <div>
                <SectionLabel className="mb-3 lg:mb-[18px]">
                  À savoir
                </SectionLabel>
                <h2 className="text-[27px] leading-[1.15] font-medium lg:mb-5 lg:text-[37px]">
                  {p.bilan.titre}
                </h2>
                <p className="mt-3.5 max-w-[62ch] font-sans text-[15px] leading-[1.7] text-brun-80 lg:mt-0 lg:text-body">
                  {p.bilan.texte}
                </p>
              </div>
              <div className="mt-[18px] lg:mt-0 lg:border-l lg:border-brun-14 lg:pl-14 lg:text-right">
                <p className="font-sans text-[34px] leading-[1.2] font-normal text-brun lg:text-[44px]">
                  {formatPrix(p.bilan.prix)}
                </p>
                <p className="font-sans text-caption text-brun-60 lg:mt-3 lg:max-w-[22ch]">
                  {p.bilan.mention}
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Tarifs */}
      <section id="tarifs" className="py-11 lg:py-[120px]">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
          <div>
            <SectionLabel className="mb-3 lg:mb-[18px]">Tarifs</SectionLabel>
            <h2 className="max-w-[20ch] text-[24px] leading-[1.15] font-medium lg:text-[30px]">
              {p.tarifsTitre}
            </h2>
          </div>
          <div>
            <PriceTable items={p.tarifs} note={p.tarifsNote} />
            <div className="mt-10 hidden lg:block">
              <Button href={site.planity} external>
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Les 24 heures qui suivent */}
      {p.apres ? (
        <section>
          <Container>
            <div className="grid gap-4 border-t border-brun-14 pt-8 pb-12 lg:grid-cols-[220px_repeat(3,1fr)] lg:gap-8 lg:pt-10 lg:pb-24">
              <SectionLabel>Les 24 heures qui suivent</SectionLabel>
              {p.apres.map((line) => (
                <p key={line} className="font-sans text-body-sm text-brun-80">
                  {line}
                </p>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Précautions — full width on a phone, in the column at 1440 */}
      <div className="mx-auto w-full lg:max-w-[1280px] lg:px-20">
        <PrecautionsBlock
          intro={p.precautionsIntro}
          items={p.precautions}
          footnote={p.footnote}
        />
      </div>

      {/* FAQ */}
      <section className="py-11 lg:py-[120px]">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20">
          <div>
            <SectionLabel className="mb-3 lg:mb-[18px]">
              Questions fréquentes
            </SectionLabel>
            <h2 className="text-[24px] leading-[1.15] font-medium lg:max-w-[20ch] lg:text-[30px]">
              Ce qu'on me demande souvent
            </h2>
          </div>
          <FaqAccordion items={p.faq} />
        </Container>
      </section>

      <CtaFinal
        title={`${p.label} — prendre rendez-vous`}
        line={`Réservation en ligne sur Planity, à l'institut, ${site.adresse.rue} à ${site.adresse.ville}.`}
      />
      <UniversLinks current={p.key} prestations={getPrestations()} />
    </>
  );
}
