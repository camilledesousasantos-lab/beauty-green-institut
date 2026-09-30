import Image from "next/image";

/**
 * A photo cropped to a ratio (DS `Photo`): `next/image` fills a box whose ratio is fixed, so the
 * layout never jumps while the file loads. `alt` is empty for decorative photos.
 */
export function Photo({
  src,
  alt = "",
  ratio,
  sizes,
  preload = false,
  objectPosition,
  className = "",
}: {
  src: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Omit when the box's height is set by `className`. */
  ratio?: string;
  sizes: string;
  /** Above-the-fold photo (LCP): preloaded, never lazy. */
  preload?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-beige ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
