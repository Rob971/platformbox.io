import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.platformbox.io";

export const metadata: Metadata = {
  title: "PlatformBox.io — Your Developer Platform. Live in 14 Days.",
  description:
    "A fixed-price engagement that delivers a production-ready developer platform in 14 working days — a standardized, self-service path from Git to production, built on your existing AWS and Kubernetes stack.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PlatformBox.io — Your Developer Platform. Live in 14 Days.",
    description:
      "Give your engineering teams a standardized, self-service path from Git to production. Fixed-price, live in 14 working days.",
    url: siteUrl,
    siteName: "PlatformBox.io",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlatformBox.io — Your Developer Platform. Live in 14 Days.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlatformBox.io — Your Developer Platform. Live in 14 Days.",
    description:
      "A fixed-price engagement that delivers a production-ready developer platform in 14 working days.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50 font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#organization`,
                  name: "PlatformBox.io",
                  url: siteUrl,
                  logo: `${siteUrl}/favicon.ico`,
                  description:
                    "A fixed-price engagement that delivers a production-ready developer platform in 14 working days.",
                  sameAs: [
                    "https://www.linkedin.com/in/robertocornano/",
                  ],
                },
                {
                  "@type": "Service",
                  "@id": `${siteUrl}/#service`,
                  name: "PlatformBox Launch",
                  description:
                    "A production-ready developer platform delivered in 14 working days — a standardized, self-service path from Git to production on your existing AWS and Kubernetes stack.",
                  provider: { "@id": `${siteUrl}/#organization` },
                  areaServed: "Worldwide",
                  offers: [
                    {
                      "@type": "Offer",
                      name: "PlatformBox Launch",
                      price: "20000",
                      priceCurrency: "EUR",
                    },
                    {
                      "@type": "Offer",
                      name: "PlatformBox Scale",
                      price: "39000",
                      priceCurrency: "EUR",
                    },
                    {
                      "@type": "Offer",
                      name: "PlatformBox Enterprise",
                      price: "60000",
                      priceCurrency: "EUR",
                    },
                  ],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
