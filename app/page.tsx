"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

const DESKTOP = "/maquette/desktop.html";
const MOBILE = "/maquette/mobile.html";
/** Below this width the 1440 px mock would scroll sideways: serve the 390 mock. */
const MOBILE_MAX_WIDTH = 900;

/**
 * Validation entry point: the v1 mock produced in Claude Design (2026-09-20),
 * served as two static bundles. The root picks the one that fits the screen;
 * the links below remain for readers without JavaScript or who want the other view.
 */
export default function Home() {
  useEffect(() => {
    const target = window.innerWidth < MOBILE_MAX_WIDTH ? MOBILE : DESKTOP;
    window.location.replace(target);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-vert">
        Maquette en validation
      </p>
      <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-md font-serif text-2xl leading-snug">
        Ouverture de la maquette…
      </p>
      <nav className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={DESKTOP}
          className="inline-block bg-brun px-8 py-4 text-xs uppercase tracking-[0.2em] text-blanc-casse transition-colors hover:bg-vert"
        >
          Version ordinateur
        </a>
        <a
          href={MOBILE}
          className="inline-block border border-brun px-8 py-4 text-xs uppercase tracking-[0.2em] text-brun transition-colors hover:bg-beige"
        >
          Version téléphone
        </a>
      </nav>
    </main>
  );
}
