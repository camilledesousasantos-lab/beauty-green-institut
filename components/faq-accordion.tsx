"use client";
// Client component: which question is open.

import { useEffect, useId, useState } from "react";

/**
 * DS `FaqAccordion`: one answer open at a time. By default the first answer is open on desktop
 * and none on a phone (MobileScreens.jsx) — decided in CSS before hydration, so nothing jumps.
 */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  // null = the default state (first open from 1024 px, none below); then the index clicked.
  const [open, setOpen] = useState<number | null>(null);
  const [desktop, setDesktop] = useState(false);
  const id = useId();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    setDesktop(query.matches);
    const onChange = () => setDesktop(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const isOpen = (i: number) =>
    open === null ? desktop && i === 0 : open === i;

  return (
    <div className="border-t border-brun-14">
      {items.map((item, i) => {
        const expanded = isOpen(i);
        const panelClass =
          open === null && i === 0
            ? "hidden lg:block"
            : expanded
              ? "block"
              : "hidden";
        return (
          <div key={item.q} className="border-b border-brun-14">
            <button
              type="button"
              id={`${id}-q${i}`}
              aria-expanded={expanded}
              aria-controls={`${id}-a${i}`}
              onClick={() => setOpen(expanded ? -1 : i)}
              className="flex min-h-12 w-full items-center justify-between gap-6 py-5 text-left font-serif text-[20px] font-medium text-brun lg:py-6"
            >
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="relative h-[13px] w-[13px] flex-none text-vert"
              >
                <span className="absolute top-1.5 left-0 w-[13px] border-t border-current" />
                {expanded ? null : (
                  <span className="absolute top-0 left-1.5 h-[13px] border-l border-current" />
                )}
              </span>
            </button>
            <div id={`${id}-a${i}`} className={`pb-[26px] ${panelClass}`}>
              <p className="max-w-[62ch] font-sans text-body text-brun-80">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
