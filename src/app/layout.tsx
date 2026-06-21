import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/data/site";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-urbanist",
  display: "swap"
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions (antidetect browsers, VPNs, Grammarly, etc.)
    // inject attributes onto html/body before React hydrates. This silences that benign noise.
    <html className={urbanist.variable} lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
