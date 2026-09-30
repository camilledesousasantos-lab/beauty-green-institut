import Link from "next/link";
import { getSite } from "@/lib/content";
import { Logo } from "./logo";

const COLUMN_TITLE =
  "mb-4 font-sans text-label uppercase tracking-label text-ecru/55";
const LINE = "block py-1 font-sans text-body-sm";
const SOFT = `${LINE} text-ecru/80 hover:text-ecru`;
const STRONG = `${LINE} text-ecru`;

/**
 * DS `SiteFooter`: identity, address, hours, contact — and only the two legal pages of v1
 * (no CGV page: they belong to the online gift vouchers of v2; no cookie page: none is set).
 */
export function SiteFooter() {
  const site = getSite();
  const { rue, cp, ville } = site.adresse;
  const maps = `https://maps.google.com/?q=${encodeURIComponent(`${rue} ${cp} ${ville}`)}`;

  return (
    <footer className="bg-brun px-5 pt-14 pb-10 text-ecru md:px-10 lg:px-20 lg:pt-[84px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="lg:hidden">
              <Logo size={46} tone="ecru" />
            </span>
            <span className="hidden lg:inline">
              <Logo size={56} tone="ecru" />
            </span>
            <p className="mt-[22px] max-w-[18ch] font-serif text-[24px] leading-[1.2] font-medium text-ecru lg:text-[28px]">
              {site.nom}
            </p>
            <p className="mt-3.5 max-w-[30ch] font-sans text-body-sm text-ecru/70">
              Institut de beauté à {ville}. Uniquement sur rendez-vous.
            </p>
          </div>

          <div>
            <p className={COLUMN_TITLE}>Adresse</p>
            <p className={STRONG}>{rue}</p>
            <p className={SOFT}>
              {cp} {ville}
            </p>
            <a
              href={maps}
              target="_blank"
              rel="noopener"
              className={`${SOFT} underline underline-offset-4`}
            >
              Ouvrir dans Google Maps
            </a>
          </div>

          <div>
            <p className={COLUMN_TITLE}>Horaires</p>
            {site.horaires.map((line, i) => (
              <p key={line} className={i === 0 ? STRONG : SOFT}>
                {line}
              </p>
            ))}
          </div>

          <div>
            <p className={COLUMN_TITLE}>Contact</p>
            <a href={site.telHref} className={STRONG}>
              {site.tel}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener"
              className={SOFT}
            >
              {site.instagram.handle}
            </a>
            <a
              href={site.planity}
              target="_blank"
              rel="noopener"
              className={`${SOFT} underline underline-offset-4`}
            >
              Réserver sur Planity
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-[22px] border-t border-ecru/20 pt-6 lg:mt-[72px]">
          <span className="font-sans text-caption text-ecru/55">
            © {new Date().getFullYear()} {site.nom}
          </span>
          <nav
            aria-label="Informations légales"
            className="flex flex-wrap gap-x-[22px] gap-y-2"
          >
            <Link
              href="/mentions-legales"
              className="font-sans text-caption text-ecru/70 hover:text-ecru"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="font-sans text-caption text-ecru/70 hover:text-ecru"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
