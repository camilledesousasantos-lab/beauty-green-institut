import { Button } from "./button";
import { Container } from "./container";
import { Photo } from "./photo";
import { SectionLabel } from "./section-label";

/**
 * The mock's `PageHeader` of a prestation: label, H1, accroche and the booking button beside a
 * 5/4 photo at 1440; stacked on a phone with the photo as a 260 px band (`ElectrolyseMobile`).
 */
export function PageHeader({
  label,
  h1,
  accroche,
  image,
  imagePosition,
  planity,
}: {
  label: string;
  h1: string;
  accroche: string;
  image: string;
  imagePosition?: string;
  planity: string;
}) {
  return (
    <section className="pt-9 lg:pt-24">
      <Container className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="pb-7 lg:pb-0">
          <SectionLabel className="mb-4 lg:mb-6">{label}</SectionLabel>
          <h1 className="max-w-[12ch] text-[37px] leading-[1.08] lg:text-h1">
            {h1}
          </h1>
          <p className="mt-[18px] max-w-[54ch] font-serif text-lede-m font-medium text-brun-80 lg:mt-7 lg:text-lede">
            {accroche}
          </p>
          <div className="mt-10 hidden gap-4 lg:flex">
            <Button href={planity} external>
              Prendre rendez-vous
            </Button>
          </div>
        </div>
        <Photo
          src={image}
          sizes="(min-width: 1024px) 560px, 100vw"
          preload
          objectPosition={imagePosition}
          className="-mx-5 h-[260px] md:-mx-10 lg:mx-0 lg:aspect-[5/4] lg:h-auto"
        />
      </Container>
    </section>
  );
}
