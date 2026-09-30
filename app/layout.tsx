import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { robotsMetadata, siteBaseUrl } from "@/lib/seo";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl()),
  // "./" resolves against metadataBase on every route: the .vercel.app alias and www point to the apex.
  alternates: { canonical: "./" },
  title: {
    default: "Beauty Green Institut — Institut de beauté à Rouen",
    template: "%s — Beauty Green Institut",
  },
  description:
    "Institut de beauté à Rouen : électrolyse, soins visage, rehaussement de cils, sourcils et blanchiment dentaire. Réservation en ligne sur Planity.",
  robots: robotsMetadata(),
};

// viewport-fit=cover: the fixed booking bar sits above the iPhone home indicator (safe-area inset).
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f3efe8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="bg-ecru pb-[calc(92px+env(safe-area-inset-bottom))] font-sans text-brun antialiased lg:pb-0">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
