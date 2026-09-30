import Link from "next/link";
import type { ReactNode } from "react";

/** DS `Button` (design/maquette/ds/components/core/Button.jsx): every button of the site is a link. */
const BASE =
  "inline-flex items-center justify-center gap-2.5 border font-sans font-medium uppercase tracking-button whitespace-nowrap no-underline [transition:var(--transition-hover)]";

const SIZES = {
  sm: "px-5 py-[11px] text-[11px]",
  md: "min-h-[52px] px-[30px] py-4 text-[12px]",
  lg: "min-h-12 px-10 py-5 text-[13px]",
} as const;

const VARIANTS = {
  primary: "border-brun bg-brun text-ecru hover:border-vert hover:bg-vert",
  secondary:
    "border-brun-30 bg-transparent text-brun hover:border-brun hover:bg-brun hover:text-ecru",
  accent:
    "border-vert bg-vert text-blanc-casse hover:border-brun hover:bg-brun",
  ghost:
    "min-h-0 border-0 border-b border-b-vert-40 px-0 py-1 text-[12px] text-vert hover:border-b-brun hover:text-brun",
} as const;

export interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Opens in a new tab (Planity, Instagram, Google Maps). */
  external?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const classes = [
    BASE,
    variant === "ghost" ? "" : SIZES[size],
    VARIANTS[variant],
    fullWidth ? "flex w-full" : "",
    className,
  ].join(" ");
  if (external || !href.startsWith("/")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
