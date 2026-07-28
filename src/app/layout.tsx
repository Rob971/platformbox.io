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
  title: "PlatformBox.io — The 14-Day Enterprise Internal Developer Platform",
  description:
    "We give your engineers a self-serve Golden Path to deploy code instantly without needing to hire a full-time Platform Engineering team.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "PlatformBox.io — The 14-Day Enterprise Internal Developer Platform",
    description:
      "A fixed-price $20,000 engineering engagement that delivers a production-ready Internal Developer Platform in 14 days.",
    url: siteUrl,
    siteName: "PlatformBox.io",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
