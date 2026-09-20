import { siteConfig } from "@/lib/site-config";

/** Holding page shown while the real site is being built. */
export default function Home() {
  const { contact } = siteConfig;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-vert">
        {siteConfig.tagline}
      </p>
      <h1 className="mt-6 font-serif text-5xl leading-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="mt-6 max-w-md font-serif text-2xl leading-snug">
        {siteConfig.claim}
      </p>
      <p className="mt-10 text-sm text-brun/70">Nouveau site en préparation.</p>
      <a
        href={siteConfig.booking.href}
        className="mt-8 inline-block bg-brun px-8 py-4 text-xs uppercase tracking-[0.2em] text-blanc-casse transition-colors hover:bg-vert"
      >
        {siteConfig.booking.label}
      </a>
      <address className="mt-16 max-w-md text-sm not-italic leading-relaxed text-brun/80">
        {contact.address.street}, {contact.address.postalCode}{" "}
        {contact.address.city}
        <br />
        {contact.hours}
        <br />
        <a href={contact.phoneHref} className="underline underline-offset-4">
          {contact.phone}
        </a>
        {" · "}
        <a
          href={contact.instagram.href}
          className="underline underline-offset-4"
        >
          {contact.instagram.handle}
        </a>
      </address>
    </main>
  );
}
