import Link from "next/link";
import type { PrestationWithSlug } from "@/lib/content";
import { Container } from "./container";
import { SectionLabel } from "./section-label";

/** The mock's `UniversLinks`: the four other universes at the foot of a prestation page. */
export function UniversLinks({
  current,
  prestations,
}: {
  current: string;
  prestations: PrestationWithSlug[];
}) {
  const others = prestations.filter((p) => p.key !== current);
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionLabel className="mb-7">Les autres univers</SectionLabel>
        <div className="grid border-t border-brun-14 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              className="flex flex-col gap-2 border-b border-brun-14 py-6 pr-6 hover:text-vert lg:py-[30px]"
            >
              <span className="font-sans text-label tracking-label text-vert">
                {String(p.ordre).padStart(2, "0")}
              </span>
              <span className="font-serif text-[24px] leading-[1.2] font-medium">
                {p.titre}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
