import { getSite } from "@/lib/content";
import { Container } from "./container";
import { SectionLabel } from "./section-label";

/** The mock's `CtaFinal`: the brun booking band that closes a page. */
export function CtaFinal({ title, line }: { title: string; line?: string }) {
  const site = getSite();
  const { rue, cp, ville } = site.adresse;
  return (
    <section className="bg-brun py-16 lg:py-[104px]">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionLabel tone="ecru" className="mb-5 opacity-60">
              Réservation
            </SectionLabel>
            <h2 className="max-w-[16ch] text-h2-m font-medium text-ecru lg:text-h2">
              {title}
            </h2>
            {line ? (
              <p className="mt-5 max-w-[44ch] font-sans text-body text-ecru/75">
                {line}
              </p>
            ) : null}
            <div className="mt-9">
              <a
                href={site.planity}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-14 items-center justify-center bg-ecru px-6 text-center font-sans text-[13px] uppercase tracking-button text-brun hover:bg-beige sm:px-10"
              >
                Prendre rendez-vous sur Planity
              </a>
            </div>
          </div>
          <div className="grid gap-3.5 pb-1.5 font-sans text-body-sm text-ecru/80">
            <span>
              {rue}, {cp} {ville}
            </span>
            <span>{site.horairesLigne}</span>
            <a href={site.telHref} className="hover:text-ecru">
              {site.tel}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
