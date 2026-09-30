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
  return (
    <Tag
      className={`block font-sans text-label font-medium uppercase tracking-label ${TONES[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
