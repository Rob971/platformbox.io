import React from "react";
import "../src/app/globals.css";

export const metadata = {
  title: "PlatformBox.io",
  description: "Premium B2B marketing site for the 14-day Enterprise Internal Developer Platform engagement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
