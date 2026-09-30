import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond } from "next/font/google";
import { robotsMetadata, siteBaseUrl } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-cormorant",
});

const archivo = Archivo({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-archivo",
});

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${archivo.variable}`}>
      <body className="bg-ecru text-brun font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
