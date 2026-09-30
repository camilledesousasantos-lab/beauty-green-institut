import type { ReactNode } from "react";

const TONES = {
  vert: "text-vert",
  brun: "text-brun",
  ecru: "text-ecru",
} as const;

/** DS `SectionLabel`: small spaced capitals above a heading. */
export function SectionLabel({
  children,
  tone = "vert",
  as: Tag = "span",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
  as?: "span" | "p" | "h2";
  className?: string;
}) {
  // `hidden lg:block` in className must not fight a default `block`.
  const display = /\bhidden\b/.test(className) ? "" : "block";
  return (
    <Tag
      className={`${display} font-sans text-label font-medium uppercase tracking-label ${TONES[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
