import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description:
    "Électrolyse, soins visage, cils, sourcils et blanchiment dentaire à Rouen. Site en construction.",
  // Holding page: keep it out of search engines until the real site ships.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="bg-ecru text-brun font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
