import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { OffscreenPause } from "@/components/landing/offscreen-pause";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import "@/styles/globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono-source", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "imToken — Your Trusted Gateway to Web3",
  description:
    "Self-custody wallet for Bitcoin, Ethereum, TRON and 40+ networks. Swap, stake, and explore DApps with keys only you control.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable} ${mono.variable} h-full bg-landing-ground antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-landing-ground font-sans text-text-primary">
        <SmoothScroll>{children}</SmoothScroll>
        <OffscreenPause />
      </body>
    </html>
  );
}
