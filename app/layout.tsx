import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE } from "@/lib/constants";
import { Providers } from "@/components/providers";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description = SITE.oneLiner;

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.shortTitle}`,
    template: `%s — ${SITE.name}`,
  },
  description,
  keywords: [
    "Safal Gupta",
    "industrial digitalization",
    "manufacturing AI",
    "Power Platform",
    "Power Apps",
    "automation",
    "JCB India",
  ],
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.shortTitle}`,
    description,
    url: SITE.url,
    siteName: SITE.domain,
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.shortTitle}`,
    description,
    creator: "@safallovetocode",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  jobTitle: SITE.shortTitle,
  description: SITE.oneLiner,
  sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.x],
  image: `${SITE.url}/safal-hero-nobg.png`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
