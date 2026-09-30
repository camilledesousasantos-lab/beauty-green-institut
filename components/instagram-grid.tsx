import Image from "next/image";

/**
 * DS `InstagramGrid`: six photos Camille picks in Pages CMS (no Meta connection) and a link to
 * her account. 6 columns from 1024 px, 3 below.
 */
export function InstagramGrid({
  handle,
  url,
  title,
  photos,
}: {
  handle: string;
  url: string;
  title: string;
  photos: string[];
}) {
  return (
    <section aria-labelledby="instagram">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-5 lg:mb-9">
        <div>
          <span className="mb-3 block font-sans text-label uppercase tracking-label text-vert lg:mb-3.5">
            {handle}
          </span>
          <h2 id="instagram" className="text-h2-m font-medium lg:text-h2">
            {title}
          </h2>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-12 items-center border border-brun-30 px-7 py-4 font-sans text-[11px] uppercase tracking-button text-brun hover:border-brun hover:bg-brun hover:text-ecru"
        >
          Suivre sur Instagram
        </a>
      </div>
      <div className="grid grid-cols-3 gap-1.5 lg:grid-cols-6 lg:gap-2">
        {photos.map((src, i) => (
          <div
            key={`${i}-${src}`}
            className="relative aspect-square overflow-hidden bg-beige"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 190px, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
