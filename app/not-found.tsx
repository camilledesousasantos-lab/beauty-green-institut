import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionLabel } from "@/components/section-label";
import { getSite } from "@/lib/content";

/** 404 — Next adds `noindex` to this page by itself. */
export default function NotFound() {
  const site = getSite();
  return (
    <section className="py-16 lg:py-36">
      <Container>
        <SectionLabel className="mb-4 lg:mb-6">Page introuvable</SectionLabel>
        <h1 className="text-h1-m lg:max-w-[16ch] lg:text-h1">
          Cette page n'existe pas ou plus.
        </h1>
        <p className="mt-6 max-w-[48ch] font-serif text-lede-m font-medium text-brun-80 lg:text-lede">
          Les prestations, les tarifs et l'institut sont à retrouver depuis
          l'accueil.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/" variant="secondary">
            Revenir à l'accueil
          </Button>
          <Button href={site.planity} external>
            Prendre rendez-vous
          </Button>
        </div>
      </Container>
    </section>
  );
}
