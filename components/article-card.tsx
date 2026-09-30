import Link from "next/link";
import { Photo } from "./photo";

/** DS `ArticleCard`: a Journal article in a list (image, category · date, title). */
export function ArticleCard({
  href,
  title,
  category,
  date,
  image,
}: {
  href: string;
  title: string;
  category: string;
  date: string;
  image: string;
}) {
  return (
    <Link href={href} className="group block text-brun">
      <Photo
        src={image}
        ratio="3 / 2"
        sizes="(min-width: 1024px) 360px, 100vw"
      />
      <div className="flex flex-col gap-2.5 pt-[18px]">
        <span className="flex items-center gap-3 font-sans text-label uppercase tracking-label text-vert">
          {category}
          <span className="tracking-[0.06em] text-brun-60">{date}</span>
        </span>
        <h3 className="max-w-[26ch] text-[25px] leading-[1.18] font-medium [transition:var(--transition-hover)] group-hover:text-vert">
          {title}
        </h3>
      </div>
    </Link>
  );
}
