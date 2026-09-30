"use client";
// Client only to read the current path (the header itself stays a server component).

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isCurrent } from "./nav";

/** A desktop menu entry, underlined in vert on its own page (DS `SiteHeader`). */
export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const current = isCurrent(usePathname(), href);
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={`border-b pb-1 font-sans text-[13px] font-normal tracking-[0.04em] text-brun hover:text-vert ${current ? "border-vert" : "border-transparent"}`}
    >
      {children}
    </Link>
  );
}
