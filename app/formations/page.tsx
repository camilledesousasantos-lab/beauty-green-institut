import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Photo } from "@/components/photo";
import { SectionLabel } from "@/components/section-label";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Formation Rehaussement de cils",
  description:
    "Formation au rehaussement de cils à Rouen, bientôt disponible chez Beauty Green Institut. Renseignements par téléphone.",
};

/** `FormationsPage` of the mock: « Bientôt disponible », no online sign-up, no form. */
export default function FormationsPage() {
  const page = getPage("formations");
  // Pad the « À venir » grid so its hairlines close the last row (2 columns on a phone, 4 at 1440).
  const pad = (columns: number) =>
    Array.from(
      { length: (columns - (page.apreparer.length % columns)) % columns },
      () => "",
    );
  const cell =
    "border-b border-brun-14 py-5 pr-6 font-serif text-[20px] font-medium text-brun-60 lg:py-[26px] lg:text-[23px]";

  return (
    <>
      <section className="pt-9 lg:pt-28">
        <Container className="grid gap-9 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
          <div>
            <SectionLabel className="mb-4 lg:mb-6">{page.label}</SectionLabel>
            <h1 className="text-h1-m lg:max-w-[14ch] lg:text-h1">{page.h1}</h1>
            <p className="mt-6 inline-block bg-beige px-5 py-2.5 font-sans text-[12px] uppercase tracking-label text-vert">
              {page.statut}
            </p>
            <p className="mt-8 max-w-[54ch] font-serif text-lede-m font-medium text-brun-80 lg:text-lede">
              {page.intro}
            </p>
          </div>
          <Photo
            src={page.image}
            ratio="1 / 1"
            sizes="(min-width: 1024px) 470px, 100vw"
            preload
          />
        </Container>
      </section>

      <section className="py-14 lg:py-28">
        <Container>
          <SectionLabel className="mb-7">À venir sur cette page</SectionLabel>
          <ul className="grid grid-cols-2 border-t border-brun-14 lg:hidden">
            {[...page.apreparer, ...pad(2)].map((item, i) => (
              <li key={`${i}-${item}`} className={cell}>
                {item}
              </li>
            ))}
          </ul>
          <ul className="hidden grid-cols-4 border-t border-brun-14 lg:grid">
            {[...page.apreparer, ...pad(4)].map((item, i) => (
              <li key={`${i}-${item}`} className={cell}>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-12 font-serif text-[25px] leading-[1.3] font-medium lg:text-[31px]">
            {page.contact}
          </p>
          <p className="mt-3.5 font-sans text-body-sm text-brun-60">
            {page.note}
          </p>
        </Container>
      </section>
    </>
  );
}
