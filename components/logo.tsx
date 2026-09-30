import Image from "next/image";

const INKS = {
  brun: "/images/logo-monogramme-brun.png",
  ecru: "/images/logo-monogramme-ecru.png",
} as const;

/** DS `Logo`: the « BG » monogram (detoured from Camille's file), with or without the wordmark. */
export function Logo({
  size,
  tone = "brun",
  wordmarkSize,
  wordmarkClassName = "",
}: {
  size: number;
  tone?: keyof typeof INKS;
  /** Omit to show the monogram alone. */
  wordmarkSize?: number;
  /** Extra classes for the wordmark (e.g. hide it on narrow desktops). */
  wordmarkClassName?: string;
}) {
  return (
    <span className="inline-flex items-center gap-3.5">
      <Image
        src={INKS[tone]}
        alt={wordmarkSize ? "" : "Beauty Green Institut"}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
      {wordmarkSize ? (
        <span
          className={`font-serif font-medium leading-none tracking-[0.01em] whitespace-nowrap ${tone === "ecru" ? "text-ecru" : "text-brun"} ${wordmarkClassName}`}
          style={{ fontSize: wordmarkSize }}
        >
          Beauty Green Institut
        </span>
      ) : null}
    </span>
  );
}
