import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { InstagramGrid } from "@/components/instagram-grid";
import { Photo } from "@/components/photo";
import { SectionLabel } from "@/components/section-label";
import { UniverseCard } from "@/components/universe-card";
import { getPage, getPrestations, getSite } from "@/lib/content";

/**
 * Home — `HomeDesktop.jsx` at 1440 and `HomeMobile` at 390 of the validated mock (patched
 * 21/09: full-bleed photo carrying the title; no gift-card block, no Journal block).
 */
export default function Home() {
  const site = getSite();
  const accueil = getPage("accueil");
  const prestations = getPrestations();
  const [first, ...rest] = accueil.titre.split(" ").reverse();
  const titreLigne1 = rest.reverse().join(" ");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-beige lg:min-h-[760px] lg:items-center">
        <Image
          src={accueil.hero.image}
          alt={accueil.hero.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[42%_center] lg:object-[70%_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,239,232,0)_0%,rgba(243,239,232,.15)_30%,rgba(243,239,232,.92)_52%,rgba(243,239,232,.97)_100%)] lg:bg-[linear-gradient(90deg,rgba(243,239,232,.97)_0%,rgba(243,239,232,.96)_52%,rgba(243,239,232,.5)_63%,rgba(243,239,232,0)_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-40 bg-[linear-gradient(180deg,rgba(243,239,232,0),rgba(243,239,232,.55))] lg:block"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-5 pt-[200px] pb-10 md:px-10 lg:px-20 lg:py-[120px]">
          <SectionLabel tone="brun" className="mb-[18px] lg:mb-7">
            {accueil.label}
          </SectionLabel>
          <h1 className="text-[48px] leading-[1.05] lg:text-[84px] lg:leading-[1.02] lg:tracking-[-0.005em]">
            {titreLigne1 ? (
              <>
                {titreLigne1}
                <br />
              </>
            ) : null}
            {first}
          </h1>
          <p className="mt-5 font-serif text-[21px] leading-[1.4] font-medium italic text-brun-80 lg:mt-8 lg:max-w-[30ch] lg:text-[25px]">
            {accueil.accroche}
          </p>
          <div className="mt-12 hidden flex-wrap gap-4 lg:flex">
            <Button href={site.planity} size="lg" external>
              Prendre rendez-vous
            </Button>
            <Button href="/institut" variant="secondary" size="lg">
              Découvrir l'institut
            </Button>
          </div>
        </div>
        <span className="absolute right-10 bottom-7 hidden font-sans text-[11px] uppercase tracking-label text-brun lg:block">
          {site.adresse.rue}, {site.adresse.ville}
        </span>
      </section>

      {/* Mobile: the institute link right under the hero (HomeMobile) */}
      <div className="px-5 pt-7 pb-12 lg:hidden">
        <Link
          href="/institut"
          className="inline-flex min-h-12 items-center border-b border-vert-40 font-sans text-[11px] uppercase tracking-button text-vert"
        >
          Découvrir l'institut
        </Link>
      </div>

      {/* Bienvenue */}
      <section className="bg-blanc-casse pt-10 pb-12 lg:bg-transparent lg:py-36">
        <Container className="lg:grid lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-20">
          <SectionLabel className="hidden lg:block">Bienvenue</SectionLabel>
          <p className="max-w-[38ch] font-serif text-[24px] leading-[1.5] font-medium text-brun lg:text-[34px] lg:leading-[1.45]">
            {accueil.intro}
          </p>
        </Container>
      </section>

      {/* Les cinq univers */}
      <section
        aria-labelledby="univers"
        className="pt-14 pb-14 lg:bg-blanc-casse lg:py-32"
      >
        <Container>
          <div className="mb-8 lg:mb-14">
            <SectionLabel className="mb-3.5 lg:mb-[18px]">
              Les prestations
            </SectionLabel>
            <h2
              id="univers"
              className="max-w-[16ch] text-h2-m font-medium lg:max-w-[20ch] lg:text-h2"
            >
              Cinq univers, un même soin du détail
            </h2>
          </div>
          <div className="grid gap-11 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-y-[72px]">
            {prestations.slice(0, 3).map((p) => (
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
            <div className="hidden flex-col justify-end border-b border-brun-14 pb-3 lg:flex">
              <p className="max-w-[26ch] font-serif text-[20px] leading-[1.6] font-medium text-brun-80">
                Chaque prestation a sa page : déroulement, durée, tarifs et
                précautions.
              </p>
              <Link
                href="/prestations"
                className="mt-5 self-start border-b border-vert-40 pb-[3px] font-sans text-[11px] uppercase tracking-button text-vert hover:border-brun hover:text-brun"
              >
                Toutes les prestations
              </Link>
            </div>
            {prestations.slice(3).map((p) => (
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

      {/* L'institut — the phone mock replaces it by the link under the hero */}
      <section className="hidden py-32 lg:block">
        <Container className="grid grid-cols-2 items-center gap-24">
          <Photo src={accueil.institut.image} ratio="4 / 3" sizes="512px" />
          <div>
            <SectionLabel className="mb-5">L'institut</SectionLabel>
            <h2 className="max-w-[20ch] text-h2 font-medium">
              {accueil.institut.titre}
            </h2>
            <p className="mt-[26px] max-w-[62ch] font-sans text-body text-brun-80">
              {accueil.institut.texte}
            </p>
            <div className="mt-9">
              <Button href="/institut" variant="secondary">
                Découvrir l'institut
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Instagram */}
      <section className="pb-14 lg:bg-blanc-casse lg:py-32">
        <Container>
          <InstagramGrid
            handle={site.instagram.handle}
            url={site.instagram.url}
            title={accueil.instagram.titre}
            photos={accueil.instagram.photos}
          />
        </Container>
      </section>
    </>
  );
}
