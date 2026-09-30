import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Photo } from "@/components/photo";
import { SectionLabel } from "@/components/section-label";
import { getPage, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "L'Institut",
  description:
    "Beauty Green Institut, rue Anatole France à Rouen : un espace pensé pour les femmes, tenu par Camille, sa fondatrice. Adresse, horaires et réservation.",
};

/** `InstitutPage` of the mock. Camille's portrait stays a small medallion (her wish: never large). */
export default function InstitutPage() {
  const page = getPage("institut");
  const site = getSite();
  const [header, gallery1, gallery2] = page.photos;
  const { rue, cp, ville } = site.adresse;
  const maps = `https://maps.google.com/?q=${encodeURIComponent(`${rue} ${cp} ${ville}`)}`;
  const practical: [string, string][] = [
    ["Adresse", `${rue}, ${cp} ${ville}`],
    ["Horaires", site.horaires.join("\n")],
    ["Téléphone", site.tel],
    ["Réservation", "Uniquement sur Planity"],
  ];

  return (
    <>
      <section className="pt-9 lg:pt-24">
        <Container className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <SectionLabel className="mb-4 lg:mb-6">{page.label}</SectionLabel>
            <h1 className="text-h1-m lg:max-w-[13ch] lg:text-h1 lg:leading-[1.06]">
              {page.h1}
            </h1>
          </div>
          {header ? (
            <Photo
              src={header}
              ratio="16 / 10"
              sizes="(min-width: 1024px) 560px, 100vw"
              preload
            />
          ) : null}
        </Container>
      </section>

      <section className="py-14 lg:py-[120px]">
        <Container className="grid gap-9 lg:grid-cols-[260px_1fr] lg:items-start lg:gap-20">
          <div className="flex items-center gap-5 lg:block">
            <Image
              src={page.portrait}
              alt={page.signature}
              width={150}
              height={150}
              className="h-[110px] w-[110px] rounded-full object-cover object-[center_30%] lg:h-[150px] lg:w-[150px]"
            />
            <p className="font-serif text-[19px] font-medium italic lg:mt-[18px]">
              {page.signature}
            </p>
          </div>
          <div className="grid max-w-[58ch] gap-[26px]">
            {page.texte.map((paragraph, i) =>
              i === 0 ? (
                <p
                  key={paragraph}
                  className="font-serif text-[22px] leading-[1.5] font-medium text-brun lg:text-[26px]"
                >
                  {paragraph}
                </p>
              ) : (
                <p key={paragraph} className="font-sans text-body text-brun-80">
                  {paragraph}
                </p>
              ),
            )}
          </div>
        </Container>
      </section>

      <section className="bg-beige py-12 lg:py-[88px]">
        <Container>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-between">
            {page.valeurs.map((valeur) => (
              <li
                key={valeur}
                className="font-serif text-[24px] font-medium text-brun lg:text-[31px]"
              >
                {valeur}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 lg:py-[120px]">
        <Container className="grid gap-4 sm:grid-cols-2 lg:gap-8">
          {[gallery1, gallery2].filter(Boolean).map((src) => (
            <Photo
              key={src}
              src={src}
              ratio="4 / 3"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          ))}
        </Container>
      </section>

      <section className="bg-blanc-casse py-14 lg:py-[104px]">
        <Container>
          <div className="grid gap-8 border-t border-brun-14 pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:pt-10">
            {practical.map(([title, value]) => (
              <div key={title}>
                <SectionLabel className="mb-3.5">{title}</SectionLabel>
                <p className="font-sans text-body leading-[1.7] whitespace-pre-line text-brun">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <Button href={site.planity} external>
              Prendre rendez-vous
            </Button>
            <Button href={maps} variant="secondary" external>
              Ouvrir dans Google Maps
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
