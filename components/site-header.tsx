import Link from "next/link";
import { getPrestations, getSite } from "@/lib/content";
import { Button } from "./button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { buildNav } from "./nav";
import { NavLink } from "./nav-link";

/**
 * DS `SiteHeader` (≥ 1024 px) and the mobile frame of `MobileScreens.jsx` (< 1024 px): sticky
 * header, burger + full-screen menu, and the fixed « Prendre rendez-vous » bar at the bottom of
 * the screen — the booking button is always one tap away (charte §24).
 */
export function SiteHeader() {
  const site = getSite();
  const nav = buildNav(getPrestations());
  const addressLine = `${site.adresse.rue}, ${site.adresse.ville} · ${site.tel}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brun-14 bg-ecru">
        {/* Desktop */}
        <div className="mx-auto hidden max-w-[1440px] items-center justify-between gap-10 px-8 py-5 lg:flex xl:px-20">
          <Link href="/" aria-label="Beauty Green Institut — accueil">
            <Logo
              size={42}
              wordmarkSize={18}
              wordmarkClassName="hidden xl:inline"
            />
          </Link>
          {/* The booking button sits at the end of the menu row (DS SiteHeader). */}
          <div className="flex items-center gap-6 xl:gap-[34px]">
            <nav
              aria-label="Menu principal"
              className="flex items-center gap-6 xl:gap-[34px]"
            >
              {nav.map((item) =>
                item.children ? (
                  <div key={item.href} className="group relative flex">
                    <NavLink href={item.href}>{item.label}</NavLink>
                    <div className="invisible absolute top-full -left-5 z-50 pt-3.5 group-focus-within:visible group-hover:visible">
                      <ul className="grid min-w-[220px] gap-3 border border-brun-14 bg-blanc-casse px-[26px] py-[18px] shadow-[var(--shadow-soft)]">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="font-sans text-[13px] whitespace-nowrap text-brun hover:text-vert"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <NavLink key={item.href} href={item.href}>
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>
            <Button href={site.planity} size="sm" external>
              Prendre rendez-vous
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center justify-between px-5 py-3 lg:hidden">
          <Link href="/" aria-label="Beauty Green Institut — accueil">
            <Logo size={32} wordmarkSize={14} />
          </Link>
          <MobileMenu
            nav={nav}
            planity={site.planity}
            addressLine={addressLine}
          />
        </div>
      </header>

      <a
        href={site.planity}
        target="_blank"
        rel="noopener"
        data-testid="cta-mobile"
        className="fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-30 flex h-14 items-center justify-center border border-ecru/20 bg-brun font-sans text-[13px] uppercase tracking-button text-ecru shadow-[var(--shadow-soft)] lg:hidden"
      >
        Prendre rendez-vous
      </a>
    </>
  );
}
