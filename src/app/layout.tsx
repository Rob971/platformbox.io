import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/lib/theme";
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

const ANTI_FLASH = `(function(){try{var t=localStorage.getItem("platformbox-theme");if(t==="light"){document.documentElement.classList.remove("dark")}else if(!t){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export const metadata: Metadata = {
  title: "PlatformBox.io — Your Developer Platform. Live in 14 Working Days.",
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
    title: "PlatformBox.io — Your Developer Platform. Live in 14 Working Days.",
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
        alt: "PlatformBox.io — Your Developer Platform. Live in 14 Working Days.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlatformBox.io — Your Developer Platform. Live in 14 Working Days.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* System-level favicon switching before JS hydrates.
            The ThemeProvider overrides the all-media one on mount/toggle. */}
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-light.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
