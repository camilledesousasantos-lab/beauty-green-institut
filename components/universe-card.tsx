import Link from "next/link";
import { Photo } from "./photo";

/** DS `UniverseCard`: one of the five universes, all of the same rank (charte §7). */
export function UniverseCard({
  href,
  index,
  title,
  line,
  image,
  aspect = "aspect-[3/2] lg:aspect-[4/5]",
  sizes,
}: {
  href: string;
  index: string;
  title: string;
  line: string;
  image: string;
  /** Tailwind aspect classes: 3/2 on a phone, 4/5 at 1440 (HomeMobile / HomeDesktop). */
  aspect?: string;
  sizes: string;
}) {
  return (
    <Link href={href} className="group block text-brun">
      <Photo src={image} sizes={sizes} className={aspect} />
      <div className="flex flex-col gap-2 pt-5">
        <span className="font-sans text-label tracking-label text-vert">
          {index}
        </span>
        <h3 className="text-h3-m font-medium lg:text-h3">{title}</h3>
        <p className="max-w-[34ch] font-sans text-body-sm text-brun-60">
          {line}
        </p>
        <span className="mt-1.5 self-start border-b border-vert-40 pb-[3px] font-sans text-[11px] uppercase tracking-button text-vert [transition:var(--transition-hover)] group-hover:border-brun group-hover:text-brun">
          Découvrir
        </span>
      </div>
    </Link>
  );
}
