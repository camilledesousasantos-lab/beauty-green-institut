"use client";
// Client component: the open/closed state of the full-screen menu.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { isCurrent, type NavItem } from "./nav";

/** DS `MobileMenu`: burger, then a full-screen menu with numbered entries (< 1024 px). */
export function MobileMenu({
  nav,
  planity,
  addressLine,
}: {
  nav: NavItem[];
  planity: string;
  addressLine: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const burger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    burger.current?.focus();
  };

  return (
    <>
      <button
        ref={burger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="grid h-12 w-12 content-center justify-items-end gap-[5px]"
      >
        <span className="block w-[22px] border-t border-brun" />
        <span className="block w-[14px] border-t border-brun" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ecru"
        >
          <div className="flex items-center justify-between border-b border-brun-14 px-5 py-[18px]">
            <Logo size={34} wordmarkSize={15} />
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              className="h-12 w-12 font-sans text-[11px] uppercase tracking-label text-vert"
            >
              Fermer
            </button>
          </div>
          <nav
            aria-label="Menu principal"
            className="flex-1 overflow-y-auto px-5 py-6"
          >
            {nav.map((item, i) => (
              <div key={item.href} className="border-b border-brun-14">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={
                    isCurrent(pathname, item.href) ? "page" : undefined
                  }
                  className={`flex min-h-16 items-center gap-4 font-serif text-[29px] font-medium ${isCurrent(pathname, item.href) ? "text-vert" : "text-brun"}`}
                >
                  <span className="w-[22px] font-sans text-[11px] tracking-label text-vert">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="grid gap-0.5 pb-[18px] pl-[38px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-11 items-center font-sans text-[15px] text-brun-80"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="border-t border-brun-14 px-5 pt-5 pb-[calc(28px+env(safe-area-inset-bottom))]">
            <a
              href={planity}
              target="_blank"
              rel="noopener"
              className="flex min-h-14 items-center justify-center bg-brun font-sans text-[13px] uppercase tracking-button text-ecru"
            >
              Prendre rendez-vous
            </a>
            <p className="mt-4 text-center font-sans text-caption text-brun-60">
              {addressLine}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
